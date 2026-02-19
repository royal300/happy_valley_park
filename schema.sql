-- Database Schema for Happy Valley Frontend

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table `hero_section`
--

CREATE TABLE `hero_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `video_url` varchar(255) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `attractions`
--

CREATE TABLE `attractions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `ticket_packages`
--

CREATE TABLE `ticket_packages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` varchar(50) NOT NULL,
  `original_price` varchar(50) DEFAULT NULL,
  `discount` varchar(50) DEFAULT NULL,
  `color` varchar(255) DEFAULT 'from-blue-500 to-blue-700',
  `display_order` int(11) DEFAULT 0,
  `featured` boolean DEFAULT FALSE,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping initial data for `ticket_packages`
--

INSERT INTO `ticket_packages` (`id`, `name`, `description`, `price`, `original_price`, `discount`, `color`, `display_order`, `featured`) VALUES
(1, 'Water World Ticket', 'FULL WATER ACCESS', '₹400', '₹500', '20% OFF', 'from-cyan-500 to-blue-600', 1, 0),
(2, 'Water + Dry Park Combo', 'COMPLETE COMBO', '₹600', '', '', 'from-purple-500 to-pink-600', 2, 1),
(3, 'Dry Park All Rides', 'ALL DRY RIDES COMBO', '₹200', '', '', 'from-orange-500 to-red-600', 3, 0),
(4, 'Entry Fees', 'PARK ENTRY ONLY', '₹40', '', '', 'from-blue-500 to-blue-700', 4, 0);

COMMIT;
