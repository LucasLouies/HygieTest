DROP SCHEMA IF EXISTS testHygie CASCADE;
CREATE SCHEMA testHygie;

--TABLES
CREATE TABLE testHygie.brasseries (
    id_brasserie SERIAL PRIMARY KEY,
    nom_brasserie VARCHAR(50) NOT NULL UNIQUE,
    logo VARCHAR(100)
);

CREATE TABLE testHygie.bieres (
    id_biere SERIAL PRIMARY KEY,
    id_brasserie INT NOT NULL,
    nom_biere VARCHAR(100) NOT NULL UNIQUE,
    image_biere VARCHAR(100) NOT NULL,
    degre INT NOT NULL,
    prix FLOAT NOT NULL,
    
    FOREIGN KEY (id_brasserie) REFERENCES testHygie.brasseries(id_brasserie)
);




--INSERT
INSERT INTO testHygie.brasseries VALUES (1, 'Brasserie de Tubize', ' ');
INSERT INTO testHygie.brasseries VALUES (2, 'Brasserie Lefebvre', ' ');
INSERT INTO testHygie.brasseries VALUES (3, 'Brasserie d''Achouffe', ' ');


INSERT INTO testHygie.bieres VALUES (1, 1, 'biere 1', ' ', 3, 12.00);
INSERT INTO testHygie.bieres VALUES (2, 1, 'biere 2', ' ', 7, 10.00);
INSERT INTO testHygie.bieres VALUES (3, 1, 'biere 3', ' ', 9, 5.00);
INSERT INTO testHygie.bieres VALUES (4, 1, 'biere 4', ' ', 10, 24.00);
INSERT INTO testHygie.bieres VALUES (5, 1, 'biere 5', ' ', 40, 100.00);
INSERT INTO testHygie.bieres VALUES (6, 1, 'biere 6', ' ', 5, 60.00);

INSERT INTO testHygie.bieres VALUES (7, 2, 'biere 7', ' ', 3, 12.00);
INSERT INTO testHygie.bieres VALUES (8, 2, 'biere 8', ' ', 3, 12.00);
INSERT INTO testHygie.bieres VALUES (9, 2, 'biere 9', ' ', 3, 12.00);

INSERT INTO testHygie.bieres VALUES (10, 3, 'biere 10', ' ', 3, 12.00);
INSERT INTO testHygie.bieres VALUES (11, 3, 'biere 11', ' ', 3, 12.00);
INSERT INTO testHygie.bieres VALUES (12, 3, 'biere 12', ' ', 3, 12.00);
