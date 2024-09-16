# AI Web Scraper - README

## Project Overview

This project is an **AI-powered web scraper** built with **Streamlit** and using web scraping techniques to extract content from websites. It also integrates **Ollama's language model** (LLM) to intelligently parse specific information from the scraped content based on user input.

The project consists of three main components:

1. **Web Scraping** using Selenium and BeautifulSoup.
2. **Text Cleaning and Splitting** to prepare content for AI processing.
3. **AI Parsing** with an LLM to extract relevant information based on user-defined descriptions.

## Key Learnings

### 1. Web Scraping with Selenium and BeautifulSoup

- **Selenium** was used to automate browser tasks and retrieve website content (DOM).
- **BeautifulSoup** helped parse the HTML to extract the `<body>` content and remove unnecessary scripts and styles.

I learned how to configure Selenium with ChromeDriver and set up options to load websites. I also discovered how to handle different types of web content efficiently, clean it, and split large DOM content into smaller chunks for easier AI processing.

### 2. Streamlit for Interactive UI

Streamlit allowed me to build an interactive interface for users to:

- Input a URL.
- View the scraped website's DOM content.
- Define a description of the information they want to extract.

I learned how to use Streamlit's session state to store and manage data between user interactions and how to dynamically update the UI with expander and text area widgets.

### 3. Parsing with Ollama LLM

- The integration of **Ollama LLM** (which uses a LLaMA-based model) allowed for AI-based parsing of website content.
- I learned to use **LangChain's** prompt templates and chat chains to extract specific information from the content in a structured, user-defined manner.

### Challenges Faced

1. **Setting Up Selenium**

   - **Challenge**: Configuring Selenium with ChromeDriver was a bit tricky, especially handling path issues for the driver.
   - **Solution**: I ensured the correct path was set for the ChromeDriver and handled driver options properly to load pages efficiently.

2. **Handling Large DOM Content**

   - **Challenge**: Large web pages could exceed size limits for AI model input.
   - **Solution**: I split the content into smaller chunks (6000 characters) for more manageable processing and sequential parsing by the AI.

3. **Parsing with AI**
   - **Challenge**: Fine-tuning the AI to precisely extract only the relevant information was difficult.
   - **Solution**: I crafted a clear and strict prompt template to control the model's output and ensure it followed the user's instructions without adding unnecessary data.

### Future Improvements

1. **Enhance Error Handling**

   - Currently, the app assumes valid input and successful scraping every time. I could add more robust error handling for cases where a website might not load, or the content is inaccessible.

2. **More Advanced AI Parsing**

   - The LLM could be fine-tuned further to handle more complex queries or specific data extraction tasks. A potential improvement could include incorporating more detailed prompts and even multi-turn dialogue with the user to refine the parsing.

3. **Browserless Scraping**

   - Selenium requires a full browser instance to scrape websites. In the future, I could explore headless browser options or API-based scraping tools to improve efficiency and reduce resource consumption.

4. **User Authentication for Paid/Protected Sites**

   - Many websites have protected content behind logins or paywalls. Adding support for user authentication within the app would expand its usability.

5. **More Sophisticated Cleaning and Parsing**
   - Expanding the content cleaning functionality to handle more complex scenarios (e.g., deeply nested tags, dynamic content) would improve accuracy and performance.

### Conclusion

This project was a fantastic learning experience that introduced me to key concepts in web scraping, interactive UI development with Streamlit, and AI-powered natural language processing. I gained insight into the challenges of dealing with web data and how to build scalable solutions using modern tools like Selenium, BeautifulSoup, and Ollama LLM.
