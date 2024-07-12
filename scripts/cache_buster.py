import os
import re

# Define the HTML files to update
html_files = ['../index.html', '../web2/pbj/pbjs.html','../web2/wfk/lets_eat.html']

# Function to update the version number in the HTML file
def update_version(file_path, new_version):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Define the replacement function
    def replace_version(match):
        return match.group(1) + new_version

    # Update the version number for CSS and JS files
    content = re.sub(r'(styles\.css\?v=)[\d.]+', replace_version, content)
    content = re.sub(r'(scripts\.js\?v=)[\d.]+', replace_version, content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

    print(f'Updated version to {new_version} in {file_path}')

# Get the new version number from the user
new_version = input('Enter the new version number (e.g., 2.0.1): ')

# Update the version in each HTML file
for html_file in html_files:
    update_version(html_file, new_version)
