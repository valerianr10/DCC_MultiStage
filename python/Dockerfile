FROM python:3.11-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

RUN python -m venv /usr/app/venv
ENV PATH="/usr/app/venv/bin:$PATH"


COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt



FROM python:3.11-slim

RUN useradd -m wsgiuser

ENV PATH="/usr/app/venv/bin:$PATH"
WORKDIR /usr/app


COPY --from=build /usr/app/venv ./venv

COPY . .

EXPOSE 8000

USER wsgiuser

CMD ["uwsgi", "--master", "--enable-threads", "--thunder-lock", "--single-interpreter", "--http", ":8000", "--module", "project.wsgi"]
