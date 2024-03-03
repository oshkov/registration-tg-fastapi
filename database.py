from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
import config


engine = create_async_engine(config.DATABASE_URL)

Base = declarative_base()

async_session = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Создание сессии
async def get_session():
    async with async_session() as session:
        yield session

# Создание всех таблиц
async def init_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
