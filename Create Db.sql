-- Create Database
CREATE DATABASE Test_db;
USE Test_db;

-- Create Tables
CREATE TABLE Quiz (
    id INT PRIMARY KEY,
    name NVARCHAR(255) NOT NULL
);

CREATE TABLE Question (
    [id][int] PRIMARY Key IDENTITY(1,1) NOT NULL,
    -- id INT PRIMARY KEY,
    question NVARCHAR(MAX) NOT NULL,
    quizId INT FOREIGN KEY REFERENCES Quiz(id)
);

CREATE TABLE Answer (
    [id][int]  IDENTITY(1,1) NOT NULL,
    -- id INT PRIMARY KEY,
    answer NVARCHAR(MAX) NOT NULL,
    isCorrect BIT NOT NULL,
    questionId INT FOREIGN KEY REFERENCES Question(id)
);