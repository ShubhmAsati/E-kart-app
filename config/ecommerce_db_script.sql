-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2019 at 06:16 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(5) NOT NULL,
  `address_line1` text NOT NULL,
  `address_line2` text,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  `address_type` varchar(10) NOT NULL COMMENT 'delivery or billing',
  `user_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `address_line1`, `address_line2`, `city`, `state`, `country`, `address_type`, `user_id`) VALUES
(1, 'arkham asylum', 'police station', '', '', '', '', 0),
(2, 'old gotham', 'city hall district', '', '', '', '', 0),
(3, 'arkham asylum', 'police station', '', '', '', '', 0),
(4, 'old gotham', 'city hall district', '', '', '', '', 0),
(5, 'the reservviour', NULL, '', '', '', '', 0),
(6, 'mogambo khush hua', NULL, 'pune', 'maharashtra', 'india', 'delivery', 0),
(7, 'mogambo khush hua', NULL, 'pune', 'maharashtra', 'india', 'delivery', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `user_id` int(5) NOT NULL,
  `card_number` bigint(16) NOT NULL,
  `card_holder_name` varchar(30) NOT NULL,
  `expiry` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`user_id`, `card_number`, `card_holder_name`, `expiry`) VALUES
(1, 2147483647, 'poision ivy', '12-2018'),
(2, 2147483647, 'deadshot', '12-2019'),
(1, 2147483647, 'shub', '12-3456');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `product_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `product_add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prod_quantity` int(5) NOT NULL,
  `subscription` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`product_id`, `user_id`, `product_add_date`, `prod_quantity`, `subscription`) VALUES
(2, 2, '2019-02-09 10:38:01', 5, 0),
(3, 1, '2019-02-09 10:38:01', 6, 0),
(4, 2, '2019-02-09 10:38:02', 7, 0),
(1, 4, '2019-02-09 10:38:02', 6, 0),
(2, 3, '2019-02-09 10:38:02', 9, 0),
(3, 3, '2019-02-09 10:38:02', 1, 0),
(4, 4, '2019-02-09 10:38:02', 3, 0),
(2, 2, '2019-02-10 20:01:58', 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `get_updates_by_email`
--

CREATE TABLE `get_updates_by_email` (
  `email` varchar(50) NOT NULL,
  `c_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `get_updates_by_email`
--

INSERT INTO `get_updates_by_email` (`email`, `c_date`) VALUES
('batman@joker.com', '2019-02-09 08:21:22'),
('khaled@bravo.com', '2019-02-09 19:01:35'),
('khaled@bravo.com', '2019-02-09 19:03:10'),
('khaled@bravo.com', '2019-02-09 19:03:50');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(5) NOT NULL,
  `notification_data` varchar(255) NOT NULL,
  `creation_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `update_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `notification_data`, `creation_date`, `expiry_date`, `update_at`) VALUES
(1, 'heello brother', '9999-09-12', '9999-09-12', '9999-09-12');

-- --------------------------------------------------------

--
-- Table structure for table `notification_user`
--

CREATE TABLE `notification_user` (
  `notification_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification_user`
--

INSERT INTO `notification_user` (`notification_id`, `user_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `order_status` int(1) NOT NULL DEFAULT '1',
  `order_place_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_amount` int(10) NOT NULL,
  `delivery_address_id` int(5) NOT NULL,
  `order_pincode` int(6) NOT NULL,
  `payment_method` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_status`, `order_place_date`, `order_amount`, `delivery_address_id`, `order_pincode`, `payment_method`) VALUES
(2, 1, 1, '2019-02-09 10:17:27', 1234, 1, 470661, 1),
(3, 2, 2, '2019-02-09 10:17:27', 12234, 2, 470662, 2),
(4, 1, 0, '2019-02-11 19:00:42', 234, 1, 456789, 1),
(5, 1, 0, '2019-02-11 19:16:22', 234, 1, 456789, 1),
(6, 1, 0, '2019-02-11 19:16:51', 234, 1, 456789, 1),
(7, 1, 0, '2019-02-11 19:17:29', 234, 1, 456789, 1),
(8, 1, 0, '2019-02-11 19:18:13', 234, 1, 456789, 1),
(9, 1, 0, '2019-02-11 19:20:12', 234, 1, 456789, 1),
(10, 1, 0, '2019-02-11 19:20:32', 234, 1, 456789, 1),
(11, 1, 0, '2019-02-11 19:21:19', 234, 1, 456789, 1),
(12, 1, 0, '2019-02-11 19:22:31', 234, 1, 456789, 1),
(13, 1, 0, '2019-02-11 19:22:49', 234, 1, 456789, 1),
(14, 1, 0, '2019-02-11 19:37:00', 234, 1, 456789, 1),
(15, 1, 0, '2019-02-11 19:37:22', 234, 1, 456789, 1),
(16, 1, 0, '2019-02-11 19:37:54', 234, 1, 456789, 1),
(17, 1, 0, '2019-02-11 19:38:23', 234, 1, 456789, 1),
(18, 1, 0, '2019-02-11 19:39:42', 234, 1, 456789, 1),
(19, 1, 0, '2019-02-11 19:42:11', 234, 1, 456789, 1),
(20, 1, 0, '2019-02-11 19:43:11', 234, 1, 456789, 1),
(21, 1, 0, '2019-02-11 19:43:42', 234, 1, 456789, 1),
(22, 1, 0, '2019-02-11 19:43:54', 234, 1, 456789, 1),
(23, 1, 0, '2019-02-11 19:44:12', 234, 1, 456789, 1),
(24, 1, 0, '2019-02-11 19:47:08', 234, 1, 456789, 1),
(25, 1, 0, '2019-02-11 19:52:36', 234, 1, 456789, 1),
(26, 1, 0, '2019-02-11 19:54:08', 234, 1, 456789, 1),
(27, 1, 0, '2019-02-11 19:56:06', 234, 1, 456789, 1),
(28, 1, 0, '2019-02-12 13:07:15', 234, 1, 456789, 1),
(29, 1, 0, '2019-02-12 13:08:17', 234, 1, 456789, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_id` int(5) NOT NULL,
  `product_id` int(5) NOT NULL,
  `product_quantity` int(10) NOT NULL,
  `product_price` int(10) NOT NULL,
  `subscription` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`order_id`, `product_id`, `product_quantity`, `product_price`, `subscription`) VALUES
(1, 3, 6, 1235, 0),
(1, 4, 6, 1236, 0),
(17, 1, 3, 234, 0),
(18, 1, 3, 234, 0),
(19, 1, 3, 234, 0),
(20, 1, 3, 234, 0),
(21, 1, 3, 234, 0),
(22, 1, 3, 234, 0),
(23, 1, 3, 234, 0),
(24, 1, 3, 234, 0),
(25, 1, 3, 234, 0),
(26, 1, 3, 234, 0),
(27, 1, 3, 234, 0),
(28, 1, 3, 234, 0),
(29, 1, 3, 234, 0);

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `package_id` int(5) NOT NULL,
  `package_name` varchar(30) NOT NULL,
  `package_creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`package_id`, `package_name`, `package_creation_date`) VALUES
(1, 'asylum city', '2019-02-09 09:15:06'),
(2, 'gotham city', '2019-02-09 09:15:07');

-- --------------------------------------------------------

--
-- Table structure for table `package_products`
--

CREATE TABLE `package_products` (
  `package_id` int(5) NOT NULL,
  `product_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `package_products`
--

INSERT INTO `package_products` (`package_id`, `product_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `pincode_data`
--

CREATE TABLE `pincode_data` (
  `pincode` int(10) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pincode_data`
--

INSERT INTO `pincode_data` (`pincode`, `street`, `city`, `state`, `country`) VALUES
(123456, '', '', '', ''),
(123457, '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(5) NOT NULL,
  `product_name` varchar(30) NOT NULL,
  `product_des` varchar(50) NOT NULL,
  `product_price` int(10) NOT NULL,
  `available_quantity` int(5) NOT NULL,
  `product_type` varchar(50) NOT NULL,
  `product_creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_update_date` timestamp NULL DEFAULT NULL,
  `product_status` tinyint(1) NOT NULL,
  `product_category` tinyint(1) NOT NULL COMMENT 'if true = retail , false = bulk'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_des`, `product_price`, `available_quantity`, `product_type`, `product_creation_date`, `product_update_date`, `product_status`, `product_category`) VALUES
(1, 'batrang', 'to injure someone', 4500, -9, 'weapon', '2019-02-09 09:38:13', NULL, 0, 0),
(2, 'bat mobile', 'to ride', 444500, 1429, 'awesome', '2019-02-09 09:38:13', NULL, 0, 0),
(3, 'spray gel', 'blastings', 34500, 1234, 'weapon', '2019-02-09 09:38:14', NULL, 0, 0),
(4, 'Grappling hook', 'grap something', 44500, 1623, 'gadget', '2019-02-09 09:38:14', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_picture_data`
--

CREATE TABLE `product_picture_data` (
  `product_id` int(5) NOT NULL,
  `pic_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `product_id` int(11) NOT NULL,
  `review` text,
  `reviewer_name` varchar(30) NOT NULL,
  `review_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating_star` int(1) DEFAULT NULL,
  `review_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`product_id`, `review`, `reviewer_name`, `review_date`, `rating_star`, `review_id`) VALUES
(1, 'awesome product', 'robin', '2019-02-09 08:31:50', 5, 1),
(2, 'cool product', 'harley ', '2019-02-09 08:32:45', 4, 2),
(1, 'cool', 'shashank', '2019-02-10 18:36:14', 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `product_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `subscription_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`product_id`, `user_id`, `subscription_id`) VALUES
(1, 0, 0),
(2, 0, 0),
(1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subscription_details`
--

CREATE TABLE `subscription_details` (
  `subscription_id` int(11) NOT NULL,
  `subscription_frequency` varchar(10) NOT NULL,
  `subscription_discount` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription_details`
--

INSERT INTO `subscription_details` (`subscription_id`, `subscription_frequency`, `subscription_discount`) VALUES
(1, 'weekly', 5),
(2, 'monthly', 10),
(3, 'yearly', 20);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(5) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password_updt_date` timestamp NULL DEFAULT NULL,
  `pincode` int(6) DEFAULT NULL,
  `type_of_order` tinyint(1) DEFAULT NULL,
  `mobile_no` bigint(10) NOT NULL,
  `pic_id` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `creation_date`, `password_updt_date`, `pincode`, `type_of_order`, `mobile_no`, `pic_id`) VALUES
(1, 'batman', 'batman@joker.com', '123', '2019-02-09 09:51:03', NULL, 45677, 1, 123456789, 0),
(2, 'joker', 'joker@joker.com', '123', '2019-02-09 09:51:03', NULL, NULL, NULL, 123456789, 0),
(3, 'bruce wayne', 'bruce@joker.com', '123', '2019-02-09 09:51:03', NULL, NULL, NULL, 123456789, 0),
(4, 'alfred', 'alfred@joker.com', '123', '2019-02-09 09:51:04', NULL, NULL, NULL, 123456789, 0),
(5, 'batsy', 'harley@quinn.com', '321', '2019-02-09 17:18:12', '2019-02-09 17:44:07', NULL, NULL, 1234567876, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_picture_data`
--

CREATE TABLE `user_picture_data` (
  `pic_id` int(5) NOT NULL,
  `pic_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `pincode_data`
--
ALTER TABLE `pincode_data`
  ADD UNIQUE KEY `unique_pincode` (`pincode`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `subscription_details`
--
ALTER TABLE `subscription_details`
  ADD PRIMARY KEY (`subscription_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `unique_email` (`email`);

--
-- Indexes for table `user_picture_data`
--
ALTER TABLE `user_picture_data`
  ADD PRIMARY KEY (`pic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `subscription_details`
--
ALTER TABLE `subscription_details`
  MODIFY `subscription_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_picture_data`
--
ALTER TABLE `user_picture_data`
  MODIFY `pic_id` int(5) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
