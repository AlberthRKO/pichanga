-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-08-2020 a las 04:47:03
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pichangadb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auxiliares`
--

CREATE TABLE `auxiliares` (
  `IDAUXILIAR` int(11) NOT NULL,
  `NOMBRES` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `APELLIDOS` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `CI` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `COMPLEMENTO` char(3) COLLATE utf8_bin DEFAULT NULL,
  `TELEFONO` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `CORREO` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `FOTO` varchar(20) COLLATE utf8_bin DEFAULT 'default.jpg',
  `CUENTA` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `BANCO` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `FECHAREGISTRO` date DEFAULT NULL,
  `CONTRASENA` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `ROL` char(1) COLLATE utf8_bin DEFAULT '0',
  `ACTIVO` char(1) COLLATE utf8_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `auxiliares`
--

INSERT INTO `auxiliares` (`IDAUXILIAR`, `NOMBRES`, `APELLIDOS`, `CI`, `COMPLEMENTO`, `TELEFONO`, `CORREO`, `FOTO`, `CUENTA`, `BANCO`, `FECHAREGISTRO`, `CONTRASENA`, `ROL`, `ACTIVO`) VALUES
(11, 'Alvaro Luis', 'Zapata Moscoso', '10331470', 'CH.', '79301442', 'v170zam@gmail.com', '11.jpg', '450062797', 'BNB', '2020-08-21', '', '0', '1'),
(12, 'Alberto', 'Paredes', '5168', 'CH.', '65651', 'asdfsdfadf', 'default.jpg', '65584', 'Union', '2020-08-21', '', '0', '1'),
(13, 'Vato', 'Veres', '51685', 'CH.', '65651', 'asdfsdfadf', 'default.jpg', '65584', 'Union', '2020-08-21', '', '0', '1'),
(14, 'Asdfasdf', 'Asdfsdfa', '135135', 'CH.', '351', 'sdfasdf', 'default.jpg', '1516568', 'BNB', '2020-08-21', '', '0', '1'),
(15, 'Asdffff', 'Ffffff', '35135135', 'CH.', '46551', 'dfadfdf@gmail.com', 'default.jpg', '', 'Banco', '2020-08-21', '', '0', '1'),
(16, 'Prueba Pp', 'Asdfasdf', '31881853', 'PD.', '61531', 'asdffd@gmail.com', '16.jpg', '654', 'BNB', '2020-08-21', '', '0', '1'),
(17, 'Prueaba Ssss', 'Asdasdf Dsfdfdf', '65131', 'CB.', '486152', '65dsaf65@gmail.com', 'default.jpg', '1565843', 'PRODEM', '2020-08-21', '', '0', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conocimientos`
--

CREATE TABLE `conocimientos` (
  `IDCONOCIMIENTO` int(11) NOT NULL,
  `CONOCIMIENTO` varchar(60) COLLATE utf8_bin DEFAULT NULL,
  `IDAUXILIAR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `conocimientos`
--

INSERT INTO `conocimientos` (`IDCONOCIMIENTO`, `CONOCIMIENTO`, `IDAUXILIAR`) VALUES
(1, 'Programación', 11),
(2, 'Desarrollo Web', 11),
(3, 'Calculo', 12),
(4, 'PetroQuimica', 13),
(5, 'asdasdf', 14),
(6, 'saber', 15),
(7, 'Sabe de todo', 16),
(8, 'No sabe nada', 17),
(9, 'Vale verga', 17);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auxiliares`
--
ALTER TABLE `auxiliares`
  ADD PRIMARY KEY (`IDAUXILIAR`);

--
-- Indices de la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
  ADD PRIMARY KEY (`IDCONOCIMIENTO`),
  ADD KEY `IDAUXILIAR` (`IDAUXILIAR`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auxiliares`
--
ALTER TABLE `auxiliares`
  MODIFY `IDAUXILIAR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT de la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
  MODIFY `IDCONOCIMIENTO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conocimientos`
--
ALTER TABLE `conocimientos`
  ADD CONSTRAINT `conocimientos_ibfk_1` FOREIGN KEY (`IDAUXILIAR`) REFERENCES `auxiliares` (`IDAUXILIAR`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
