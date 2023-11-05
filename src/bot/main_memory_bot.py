import asyncio

from loader import dp, bot
from handlers import *


async def main() -> None:
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
    