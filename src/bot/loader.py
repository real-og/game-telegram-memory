from aiogram import Bot, Dispatcher
import os


BOT_TOKEN = str(os.environ.get("BOT_TOKEN"))
GAME_URL = str(os.environ.get("GAME_URL"))


bot = Bot(token=BOT_TOKEN, parse_mode="HTML")
dp = Dispatcher()
