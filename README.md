# St. Vincent School Foundation, Inc. Online Enrollment System

This repository houses the online enrollment system for **St. Vincent School Foundation, Inc. (SVSFI)**. It is designed to provide an efficient and user-friendly solution to simplify and streamline the enrollment process, enabling applicants and administrators to interact with the system seamlessly.

---

## Table of Contents

1. [About](#about)
2. [Features](#features)
3. [Environment Variables](#environment-variables)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [How to Deploy](#how-to-deploy)
7. [Contributing](#contributing)
8. [License](#license)
9. [Acknowledgments](#acknowledgments)

---

## About

The SVSFI Online Enrollment System aims to digitalize and optimize the admission process by offering a web-based application platform. It incorporates secure user authentication, an intuitive administrative dashboard, and various features to enhance user experience while maintaining data security.

---

## Features

- **Secure User Authentication**: Registration and login for applicants and administrators.
- **Digital Application Form**: Students can complete and submit their applications online.
- **Real-time Status Updates**: Applicants can track the status of their submissions.
- **Administrative Dashboard**: Tools for administrators to manage, approve, and reject applications.
- **Email Notifications**: Automated email updates to keep applicants informed.
- **Cloud Storage Integration**: Use of **Cloudflare R2** for storing application documents.
- **Customizable School Branding**: Integrated with the school's logo and information.
- **Mobile-Responsive Design**: Accessible and functional on desktops, tablets, and smartphones.

---

## Environment Variables

The application requires a `.env` file to configure various settings. Below is a breakdown of the environment variables needed:

### Database
- `DATABASE_URL`: URL for the primary database connection.
- `DATABASE_URL_UNPOOLED`: Secondary database URL (unpooled).

### Cloudflare R2 (File Storage)
- `R2_ENDPOINT`: Endpoint URL for the Cloudflare R2 bucket.
- `R2_ACCESS_KEY_ID`: Access key for Cloudflare R2.
- `R2_SECRET_ACCESS_KEY`: Secret key for Cloudflare R2.
- `R2_BUCKET_NAME`: Name of the R2 bucket.

### NextAuth (Authentication)
- `NEXTAUTH_SECRET`: Secret key for NextAuth authentication.
- `NEXTAUTH_URL`: Base URL of the application.

### Email (SMTP Configuration)
- `SMTP_HOST`: SMTP server host.
- `SMTP_PORT`: SMTP server port.
- `SMTP_USER`: SMTP username for authentication.
- `SMTP_PASSWORD`: Password for the SMTP account.
- `EMAIL_FROM`: Default sender email address for system notifications.

### Super Admin Credentials
- `SUPER_ADMIN_EMAIL`: Email address for the super admin.
- `SUPER_ADMIN_PASSWORD`: Default password for the super admin.

### School Information
- `SCHOOL_NAME`: Name of the school.
- `SCHOOL_LOGO_URL`: Path to the school logo image.

### Application Settings
- `ENROLLMENT_OPEN`: Toggle to enable or disable the enrollment process (`true` or `false`).

---

## Prerequisites

To set up the application, ensure you have the following:

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **PostgreSQL** (latest stable version)
- **Git** (optional, for cloning the repository)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/johnlorden/svsfiadmission.git
   cd svsfiadmission
