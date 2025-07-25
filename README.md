# Hash-Checker

A small Python script that checks if a file is considered malware by VirusTotal.

It works by calculating the file's SHA-256 hash and sending it to the VirusTotal API.  
If the file has been analyzed before, it returns the detection results from multiple antivirus engines.

Each result is also saved as a `.json` file with the current date and time in the name.

# Some disclaimers

The tool will provide reliable results just if the malware was scaned previous by TotalVirus.
It has been built just for learning and fun purposes.
