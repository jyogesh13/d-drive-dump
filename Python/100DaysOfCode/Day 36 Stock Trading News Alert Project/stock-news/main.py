import requests as req
import json
from datetime import datetime, timedelta
from twilio.rest import Client

STOCK = "TSLA"
COMPANY_NAME = "Tesla Inc"
STOCK_API_KEY = "IN9K9UK7DAM0GFVX"
NEWS_API_KEY = "d58c575fb77c408698edf50f78ed27d6"

## STEP 1: Use https://www.alphavantage.co
# When STOCK price increase/decreases by 5% between yesterday and the day before yesterday then print("Get News").
def stock_price():
    url = "https://www.alphavantage.co/query"
    parameters = {
        "function": "TIME_SERIES_DAILY",
        "symbol": STOCK,
        "apikey": STOCK_API_KEY,
    }
    today = datetime.now()
    yesterday = today - timedelta(1)
    day_before_yesterday = today - timedelta(2)

    response = req.get(url, params=parameters)
    print(response.status_code)
    data = response.json()["Time Series (Daily)"]

    closing_price_yesterday = float(data[f"{yesterday.date()}"]["4. close"])
    closing_day_before_yesterday = float(data[f"{day_before_yesterday.date()}"]["4. close"])
    percent_change = round((closing_price_yesterday - closing_day_before_yesterday)/closing_day_before_yesterday * 100)

    if abs(percent_change) > 3:
        get_news(percent_change)

## STEP 2: Use https://newsapi.org
# Instead of printing ("Get News"), actually get the first 3 news pieces for the COMPANY_NAME. 
def get_news(percent_change):
    url = "https://newsapi.org/v2/everything"
    parameters = {
        "q": COMPANY_NAME,
        "searchIn": "title,description",
        "apikey": NEWS_API_KEY, 
    }

    response = req.get(url, params=parameters)
    data = response.json()['articles']

    with open("news.json", "w") as file:
        json.dump(data, file, indent=4)

    if percent_change > 0:
        symbol = "🔺"
    else:
        symbol = "🔻"

    text = f"\n{COMPANY_NAME}: {symbol}{percent_change}\n"
    for news in data[0:3]:
        text += f"\n{data.index(news) + 1}. Headline: {news['title']}\nBrief: {news['description']}\n"
    
    send_sms(text)

## STEP 3: Use https://www.twilio.com
# Send a seperate message with the percentage change and each article's title and description to your phone number. 
def send_sms(text):
    ACCOUNT_SID = "AC5ffcefa5a0ed2019af6ab079732d8d18"
    AUTH_TOKEN = "d3e4a03320a0316df5ca436368367924"
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    message = client.messages.create(
    body=text,
    from_="+17542982109",
    to="+918447326048",
    )
    print(message.status)


stock_price()

#Optional: Format the SMS message like this: 
"""
TSLA: 🔺2%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
or
"TSLA: 🔻5%
Headline: Were Hedge Funds Right About Piling Into Tesla Inc. (TSLA)?. 
Brief: We at Insider Monkey have gone over 821 13F filings that hedge funds and prominent investors are required to file by the SEC The 13F filings show the funds' and investors' portfolio positions as of March 31st, near the height of the coronavirus market crash.
"""

