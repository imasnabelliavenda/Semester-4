import os

#create directory
def create_directory(folder_name):
    if not os.path.exists(folder_name):
        os.mkdir(folder_name)
create_directory("Scraping")

#membuat file baru
def create_new_file(path):
    f = open(path,'w')
    f.write("")
    f.close()
create_new_file("Scraping/test.txt")

# cek file ada / tidak
def does_file_exist(path):
    return os.path.isfile(path)
print(does_file_exist("Scraping/test.txt"))

# menulis data ke file
def write_to_file(path,data):
    with open(path,'a') as file:
        file.write(data + '\n')
write_to_file("Scraping/test.txt", "Ini adalah data yang akan digunakan untuk menampung big data")

# menampilkan data di terminal
def read_data(path):
    with open(path, 'rt') as file:
        for line in file:
            print(line.replace("\n", ""))
read_data("Scraping/test.txt")

# # menghapus data 
# def clear_file(path):
#     f = open(path,'w')
#     f.close()
# clear_file("Scraping/test.txt")