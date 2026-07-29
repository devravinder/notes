ALTER TABLE profiles
    ADD CONSTRAINT profiles_updated_by__fkey FOREIGN KEY (updated_by_) REFERENCES users (_id)
	ON UPDATE CASCADE
    ON DELETE NO ACTION
