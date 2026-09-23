#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>
#include <dirent.h>

void createFile();
void writeFile();
void readFile();
void appendFile();
void copyFile();
void deleteFile();
void viewFiles();

int main()
{
    int choice;

    while(1)
    {
        printf("\n===== FILE MANAGEMENT SYSTEM =====\n");
        printf("1. Create File\n");
        printf("2. Write File\n");
        printf("3. Read File\n");
        printf("4. Append File\n");
        printf("5. Copy File\n");
        printf("6. Delete File\n");
        printf("7. View Files\n");
        printf("8. Exit\n");

        printf("Enter choice: ");
        scanf("%d",&choice);

        switch(choice)
        {
            case 1: createFile(); break;
            case 2: writeFile(); break;
            case 3: readFile(); break;
            case 4: appendFile(); break;
            case 5: copyFile(); break;
            case 6: deleteFile(); break;
            case 7: viewFiles(); break;
            case 8: return 0;
            default: printf("Invalid Choice\n");
        }
    }
}

void createFile()
{
    char filename[50];

    printf("Enter filename: ");
    scanf("%s", filename);

    int fd = open(filename, O_CREAT | O_WRONLY, 0644);

    if(fd < 0)
    {
        printf("File not created\n");
        return;
    }

    printf("File created successfully\n");
    close(fd);
}

void writeFile()
{
    char filename[50];
    char data[200];

    printf("Enter filename: ");
    scanf("%s", filename);

    getchar();

    printf("Enter text: ");
    fgets(data, sizeof(data), stdin);

    int fd = open(filename, O_WRONLY | O_TRUNC | O_CREAT, 0644);

    if(fd < 0)
    {
        printf("File not found\n");
        return;
    }

    write(fd, data, strlen(data));

    printf("Data written successfully\n");
    close(fd);
}

void readFile()
{
    char filename[50];
    char buffer[500];

    printf("Enter filename: ");
    scanf("%s", filename);

    int fd = open(filename, O_RDONLY);

    if(fd < 0)
    {
        printf("Cannot open file\n");
        return;
    }

    int bytes = read(fd, buffer, sizeof(buffer)-1);

    if(bytes >= 0)
        buffer[bytes] = '\0';

    printf("\n----- FILE CONTENT -----\n");
    printf("%s\n", buffer);

    close(fd);
}

void appendFile()
{
    char filename[50];
    char data[200];

    printf("Enter filename: ");
    scanf("%s", filename);

    getchar();

    printf("Enter text to append: ");
    fgets(data, sizeof(data), stdin);

    int fd = open(filename, O_WRONLY | O_APPEND | O_CREAT, 0644);

    if(fd < 0)
    {
        printf("File not found\n");
        return;
    }

    write(fd, data, strlen(data));

    printf("Data appended successfully\n");
    close(fd);
}

void copyFile()
{
    char source[50];
    char destination[50];
    char buffer[200];
    int bytes;

    printf("Enter source file: ");
    scanf("%s", source);

    printf("Enter destination file: ");
    scanf("%s", destination);

    int fd1 = open(source, O_RDONLY);

    if(fd1 < 0)
    {
        printf("Source file not found\n");
        return;
    }

    int fd2 = open(destination, O_CREAT | O_WRONLY | O_TRUNC, 0644);

    while((bytes = read(fd1, buffer, sizeof(buffer))) > 0)
    {
        write(fd2, buffer, bytes);
    }

    printf("File copied successfully\n");

    close(fd1);
    close(fd2);
}

void deleteFile()
{
    char filename[50];

    printf("Enter filename to delete: ");
    scanf("%s", filename);

    if(unlink(filename) == 0)
    {
        printf("File deleted successfully\n");
    }
    else
    {
        printf("File not found or cannot delete\n");
    }
}

void viewFiles()
{
    DIR *dir;
    struct dirent *entry;

    dir = opendir(".");

    if(dir == NULL)
    {
        printf("Cannot open directory\n");
        return;
    }

    printf("\n----- FILES IN PROJECT -----\n");

    while((entry = readdir(dir)) != NULL)
    {
        if(entry->d_name[0] != '.')
        {
            printf("%s\n", entry->d_name);
        }
    }

    closedir(dir);
}
