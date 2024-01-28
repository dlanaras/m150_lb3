# SSRF Example for module 150
##  2 Express apps: one password manager that is supposedly only accessible through localhost and the second app is a vulnurable website speed lookup website.
## Example: passmanager is hosted on localhost:3000 while the website speed lookup is hosted on a public facing domain (i.e: speedtest.example.com) and internally on something like 192.168.1.100:8443. 