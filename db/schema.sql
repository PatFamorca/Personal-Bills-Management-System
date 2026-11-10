CREATE TABLE IF NOT EXISTS users (
 id BIGSERIAL PRIMARY KEY, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS bills (
 id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 name TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'Other', amount NUMERIC(12,2) NOT NULL CHECK(amount>=0),
 due_date DATE NOT NULL, recurrence TEXT NOT NULL CHECK(recurrence IN ('once','daily','weekly','monthly')),
 active BOOLEAN NOT NULL DEFAULT TRUE, notes TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS bills_user_idx ON bills(user_id);
CREATE TABLE IF NOT EXISTS occurrences (
 id BIGSERIAL PRIMARY KEY, bill_id BIGINT NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
 due_date DATE NOT NULL, amount NUMERIC(12,2) NOT NULL CHECK(amount>=0),
 paid_at TIMESTAMPTZ, paid_amount NUMERIC(12,2), created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 UNIQUE(bill_id,due_date)
);
CREATE INDEX IF NOT EXISTS occurrences_bill_date_idx ON occurrences(bill_id,due_date);
CREATE TABLE IF NOT EXISTS preferences (
 user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 reminder_days INTEGER NOT NULL DEFAULT 3 CHECK(reminder_days BETWEEN 0 AND 60),
 show_modal BOOLEAN NOT NULL DEFAULT TRUE, show_overdue BOOLEAN NOT NULL DEFAULT TRUE
);
