import os
import random
import string

# Fungsi buat directory jika belum ada
def create_directory(folder_name):
    if not os.path.exists(folder_name):
        os.mkdir(folder_name)
        print(f"Directory dibuat: {folder_name}")
    else:
        print(f"Directory sudah ada: {folder_name}")

# Fungsi cek apakah file ada
def does_file_exist(path):
    return os.path.isfile(path)

# Fungsi buat file jika belum ada
def create_new_file(path):
    if not does_file_exist(path):
        with open(path, 'w') as f:
            f.write("")  # kosong dulu
        print(f"File dibuat: {path}")
    else:
        print(f"File sudah ada: {path}")

# Fungsi generate data random unik
def generate_random_text(length=30):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# Fungsi untuk tulis data ke file
def write_to_file(path, data):
    with open(path, 'w') as file:
        file.write(data + '\n')
    print(f"Data ditulis ke: {path}")

# Fungsi utama
def simulate_scraping_storage():
    base_folder = "ScrapingData"
    create_directory(base_folder)

    for i in range(1, 6):  # 5 direktori
        dir_name = os.path.join(base_folder, f"Folder{i}")
        create_directory(dir_name)

        for j in range(1, 6):  # 5 file per direktori
            file_path = os.path.join(dir_name, f"file{j}.txt")
            create_new_file(file_path)
            random_data = f"Data unik untuk Folder{i} File{j}: " + generate_random_text()
            write_to_file(file_path, random_data)

simulate_scraping_storage()
