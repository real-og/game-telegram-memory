from aiogram import Bot, Dispatcher
import os


BOT_TOKEN = str(os.environ.get("BOT_TOKEN"))


bot = Bot(token=BOT_TOKEN, parse_mode="HTML")
dp = Dispatcher()
