<div align="center" style="margin: 30px 0">
  <img src="https://rgvpn.one/logo.png" alt="RobinGood VPN Logo" width="200"/>
  <p style="font-size: 22px; margin: 20px 0 0">Self-hosted data node</p>
  <p style="font-size: 15px">In development</p>
</div>


## Description
This is self-hosted solution for RobinGood VPN clients who need to store their team's user and device data on their own infrastructure.

It's designed for organizations that require or prefer to keep their VPN user data on-premises, whether for enhanced security, compliance reasons, or greater control over their data.

The primary purpose of this API is to allow the main RobinGood VPN backend to interact with the self-hosted database when user data is needed. This enables:

- Retrieval of user and device information
- Updates to existing records
- Creation of new users and devices
- Deletion of outdated data

By deploying this self-hosted solution, you can:
- Maintain full control over their team's VPN user and device data
- Comply with specific data residency or security requirements
- Integrate the VPN user management more closely with their existing infrastructure
- Ensure seamless operation with the main RobinGood VPN service

## Features

- User management (CRUD operations)
- Device management (CRUD operations)
- Docker support for easy deployment

## Prerequisites

- Docker and Docker Compose

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/rgvpn/self-hosted.git
   cd self-hosted
   ```

2. Create a `.env` file in the root directory and add your environment variables:
   ```
    PORT=1344
    TOKEN=302e3037383137323339393739353838373836
    PG_HOST=rgvpn-node-postgres
    PG_USER=postgres
    PG_PASSWORD=mysecretpassword
    PG_DATABASE=rgvpn-local
   ```

    Make sure to adjust these values according to your specific setup:

    - `PORT`: The port on which the server will run (default is 1344)
    - `TOKEN`: This is the authentication key for the RobinGood VPN infrastructure. It ensures that only authorized connections are allowed. Keep this token secret and secure
    - `PG_HOST`: The hostname of PostgreSQL database (optional)
    - `PG_USER`: The username for PostgreSQL database (optional)
    - `PG_PASSWORD`: The password for PostgreSQL database (optional)
    - `PG_DATABASE`: The name of PostgreSQL database (optional)

## Running the Application

1. Build and start the containers:
   ```
   docker compose up --build
   ```

2. After setting up and running your self-hosted server, send a link in the format `(IP address):(port)` to the bot by clicking the "Configure self-hosted" button in the "Team" menu, and then provide the authentication key (TOKEN).

    This step connects your self-hosted server to the RobinGood VPN infrastructure.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.