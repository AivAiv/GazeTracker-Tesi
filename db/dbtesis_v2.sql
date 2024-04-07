-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 07, 2024 alle 23:01
-- Versione del server: 10.4.28-MariaDB
-- Versione PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbtesis`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `cod_test` int(11) NOT NULL,
  `link` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `max_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `page`
--

INSERT INTO `page` (`id`, `name`, `cod_test`, `link`, `image`, `text`, `max_time`) VALUES
(2, 'paginella', 2, NULL, NULL, 'Il testoooo...', '00:10:00'),
(3, 'ciao', 3, NULL, NULL, 'Er testino.', '00:11:43'),
(36, 'prima', 75, NULL, NULL, 'La prima', '00:23:00'),
(38, 'due', 76, NULL, NULL, 'x', '00:10:00'),
(84, 'unoo', 76, NULL, NULL, '', '00:10:00'),
(85, 'pagina 1', 81, NULL, NULL, 'Ciao ciaoooo', '01:00:00'),
(87, 'terza', 81, NULL, NULL, '', '00:10:00'),
(90, 'linko', 81, 'http://linkooo', NULL, NULL, '00:10:00'),
(91, 'f', 82, 'http://linkooo', NULL, NULL, '00:10:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `cod_creator` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `test`
--

INSERT INTO `test` (`id`, `name`, `cod_creator`, `active`) VALUES
(2, 'Test inactive', 18, 0),
(3, 'Testino', 18, 1),
(75, 'Secondo Test', 15, 1),
(76, 'Terzo Test', 15, 1),
(81, 'Primo Test', 15, 0),
(82, 'nuveau', 15, 1),
(83, 'vuotino', 15, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `type` varchar(1) NOT NULL,
  `salt` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `type`, `salt`) VALUES
(15, 'silvia@gmail.com', '75582c0917ce4ac8c0e4ab1bb7ce11ca9e8918fda02e22eaa9cf0588ed1449201825df0a264cbc26c177541f5be48e56b7c905da170375b4b2f3004514ddd808', 'C', '2ec6207126bb9963673ba4f9c88306d5ab70ad5623363af17f98c38ffbeb30d8283d4408d68e14cc29aa41e5e42754c35918ffa98ccf705bffeb2b288e65d642'),
(16, 'filippo@gmail.com', 'b2e16f9b93d645250a9c71051e8761f88398a7730c5b127ef82cc5378116d667d622253ff2ecae3432abd39fa5ef700b70f2834301d2e67a680e28d500340f5e', 'T', 'a603d5054de2c3c4ac8e3557922f4ab9b0431012dafaa733f3609e912d1a9c2e011f57c7e6d574d1116a06576bbb9ba7a39e2cedcdd380f27970aff48e47b28e'),
(17, 'simone@gmail.com', '5e7d45a057da81b5b0ebdae75208f66cbd64e1c71561338fc0066dcf79b760891eae5c2fd1105a7703f2fda541fceac3bc42070ef5da3f5f53287e401a6beae1', 'T', 'f696d7e2f0f8d1b32f091e944c1bf03c56b4884a8b7a22ba13f1bee6e5b26d65a3703e284bd629de94d29070cae22eba31c01b4ad63bf9b65feafe74dea46c5c'),
(18, 'sara@gmail.com', 'cbe36e0b289a247740a174e3c1d62945ce6239a58b87171ee9d4a346cad5c1628f4e9c449f3cb42b28ac6ee0090098ee83faedf76173a280fc6fb07540bbe5bb', 'C', 'e446384c49771397c921906ad91aa38ca55a974b9d557f47bb814712c1e1add046e1ff05011f0d25b8c3c54ac53be86354dbbece02b18da643c6735767f42e66');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test-page` (`cod_test`);

--
-- Indici per le tabelle `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-test` (`cod_creator`);

--
-- Indici per le tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT per la tabella `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT per la tabella `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `test-page` FOREIGN KEY (`cod_test`) REFERENCES `test` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `user-test` FOREIGN KEY (`cod_creator`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
