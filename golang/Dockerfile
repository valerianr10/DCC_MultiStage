FROM golang:latest as base

FROM base as builder
WORKDIR /app
COPY . .
RUN go build -o ./bin/app ./main.go

FROM gcr.io/distroless/static-debian12 as runner
COPY --from=builder /app/bin/app /app/bin/app
EXPOSE 8080
ENTRYPOINT [ "/app/bin/app" ]