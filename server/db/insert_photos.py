import sqlite3
import os

username = input("Enter username")


def update_user_photo(conn, username, image_path):
    with open(image_path, "rb") as image_file:
        image_data = image_file.read()
        cursor = conn.cursor()
        cursor.execute(
            """UPDATE users SET photo = ? WHERE username = ?""",
            (sqlite3.Binary(image_data), username),
        )
        conn.commit()


def main():
    # Connect to the database or create a new one
    conn = sqlite3.connect("server/db/tinder.db")

    # Update the photo for an existing user
    new_image_path = "server/db/user_photos/images-3.jpeg"
    update_user_photo(conn, username, new_image_path)

    # Close the connection
    conn.close()


if __name__ == "__main__":
    main()
