import shutil
from fastapi import FastAPI, UploadFile, Request, Depends, Form, File
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import time
from database import get_session, init_tables
from models import User


app = FastAPI(
    title='Registration'
)

UPLOAD_FOLDER = 'photos/'


app.mount('/static', StaticFiles(directory='static'), name='static')
templates = Jinja2Templates(directory="templates")


@app.get('/registration/{user_id}')
async def main(user_id, request: Request, session = Depends(get_session)):

    # Создание таблиц в бд
    await init_tables()

    return templates.TemplateResponse(
        request=request, name="index.html"
    )


@app.post('/registration/{user_id}')
async def aaaaaaaaa(
    user_id,
    name: str = Form(...),
    age: int = Form(...),
    gender: str = Form(...),
    city: str = Form(...),
    preferences: str = Form(...),
    target: list = Form(...),
    photos: list[UploadFile] = File(...),
    about = Form(None),
    session = Depends(get_session)
):

    photo_list = []
    num = 0
    timenow = time.strftime('%d%m%Y%H%M%S')

    for photo in photos:
        # Имя для фото: дата + номер фото
        photo.filename = f'{user_id}_{timenow}_{num}.jpeg'

        # Добавление фото в список фотографий
        photo_list.append(photo.filename)

        # Скачивание фото
        with open(f'{UPLOAD_FOLDER}/{photo.filename}', 'wb') as buffer:
            shutil.copyfileobj(photo.file, buffer)
        num += 1

    creation_date = time.strftime('%d.%m.%Y / %X')

    user_info = User(
        creation_date = creation_date,
        id = user_id,
        status = 'wait',
        name = name,
        gender = gender,
        preferences = preferences,
        city = city,
        age = age,
        vk_url = None,
        target = target,
        about = about,
        photos = photo_list,
        warns = 0
    )

    try:
        # Добавление данных в сессию
        session.add(user_info)

        # Добавление данных в бд
        await session.commit()

        return True

    except Exception as ex:
        print(ex)
        return False
