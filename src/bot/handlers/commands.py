from aiogram.filters import CommandStart
from aiogram.types import Message, CallbackQuery
from aiogram.utils.markdown import hbold
from loader import dp, GAME_URL


@dp.message(CommandStart())
async def command_start_handler(message: Message) -> None:
    await message.answer(f"Hello, {hbold(message.from_user.full_name)}!")
    await message.answer_game('memory_game')


@dp.callback_query()
async def open_game(callback_query: CallbackQuery):
    await callback_query.answer(callback_query.id, url=GAME_URL)
