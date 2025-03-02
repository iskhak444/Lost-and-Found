--lost and found database
Create Database LostandFound;
USE LostandFound;

--user table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name      VARCHAR(50) NOT NULL,
    last_name       VARCHAR(50) NOT NULL,
    username        VARCHAR(50) NOT NULL UNIQUE,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,  -- hashed password
    date_of_birth   DATE,
    -- Using VARCHAR(10) for gender, plus an optional CHECK constraint
    gender          VARCHAR(10) NOT NULL DEFAULT 'other'
        CONSTRAINT chk_gender
        CHECK (gender IN ('male','female','other')),
    created_at      DATETIME NOT NULL DEFAULT (GETDATE())
)

--categories table
CREATE TABLE Categories (
    category_id   INT IDENTITY(1,1) PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

--item table
CREATE TABLE Items (
    item_id         INT IDENTITY(1,1) PRIMARY KEY,
    user_id         INT NOT NULL,
    category_id     INT NULL,
    item_name       VARCHAR(100) NOT NULL,
    description     VARCHAR(MAX),  -- instead of TEXT
    location        VARCHAR(100),
    -- Use a VARCHAR with a CHECK constraint to mimic ENUM
    status          VARCHAR(10) NOT NULL DEFAULT 'lost'
        CONSTRAINT chk_item_status
        CHECK (status IN ('lost','found','claimed','returned')),
    date_reported   DATETIME NOT NULL DEFAULT (GETDATE()),
    image_path      VARCHAR(255),
    -- Foreign Keys
    CONSTRAINT fk_item_user
        FOREIGN KEY (user_id)
        REFERENCES dbo.Users (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_item_category
        FOREIGN KEY (category_id)
        REFERENCES dbo.Categories (category_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


--claims table
CREATE TABLE Claims (
    claim_id        INT IDENTITY(1,1) PRIMARY KEY,
    item_id         INT NOT NULL,
    claimer_id      INT NOT NULL,
    claim_status    VARCHAR(10) NOT NULL DEFAULT 'pending'
        CONSTRAINT chk_claim_status
        CHECK (claim_status IN ('pending','approved','rejected')),
    claim_date      DATETIME NOT NULL DEFAULT (GETDATE()),

    -- Foreign Keys
    CONSTRAINT fk_claim_item
        FOREIGN KEY (item_id)
        REFERENCES dbo.Items (item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_claim_user
    FOREIGN KEY (claimer_id)
    REFERENCES users(user_id)
);



--messages table
CREATE TABLE Messages (
    message_id   INT IDENTITY(1,1) PRIMARY KEY,
    sender_id    INT NOT NULL,
    recipient_id INT NOT NULL,
    item_id      INT NULL,
    subject      VARCHAR(150),
    body         VARCHAR(MAX) NOT NULL,
    is_read      BIT NOT NULL DEFAULT 0,  -- 0 = unread, 1 = read
    created_at   DATETIME NOT NULL DEFAULT (GETDATE()),

    CONSTRAINT fk_msg_sender
        FOREIGN KEY (sender_id)
        REFERENCES dbo.Users (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_msg_recipient
        FOREIGN KEY (recipient_id)
        REFERENCES dbo.Users (user_id),

    CONSTRAINT fk_msg_item
        FOREIGN KEY (item_id)
        REFERENCES dbo.Items (item_id)
);


--Audit log table
CREATE TABLE Audit_Logs (
    audit_id    INT IDENTITY(1,1) PRIMARY KEY,
    user_id     INT NOT NULL,
    action_type VARCHAR(50),
    table_name  VARCHAR(50),
    record_id   INT,
    description VARCHAR(MAX),
    created_at  DATETIME NOT NULL DEFAULT (GETDATE()),

    CONSTRAINT fk_audit_user
        FOREIGN KEY (user_id)
        REFERENCES dbo.Users (user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);