import os

import os

# Membuat directory jika belum ada
def create_directory(folder_name):
    if not os.path.exists(folder_name):
        os.mkdir(folder_name)

# Membuat file baru, tapi cek dulu foldernya
def create_new_file(path):
    folder = os.path.dirname(path)
    create_directory(folder)  # pastikan foldernya ada
    with open(path, 'w') as f:
        f.write("")

# cek file ada / tidak
def does_file_exist(path):
    return os.path.isfile(path)

# menulis data ke file
def write_to_file(path,data):
    with open(path,'a') as file:
        file.write(data + '\n')

# menampilkan data di terminal
def read_data(path):
    with open(path, 'rt') as file:
        for line in file:
            print(line.replace("\n", ""))

# menghapus data 
def clear_file(path):
    f = open(path,'w')
    f.close()