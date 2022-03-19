import { Logger, SaveFile, LogToFile } from "./shared/NewLogger";

Logger("hola xd", "INFO");
LogToFile("This only shows up in the file lmao", "DEBUG");
SaveFile();