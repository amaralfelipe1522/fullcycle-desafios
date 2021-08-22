FROM golang:1.7.1-alpine as build

WORKDIR /go/src

COPY . .

RUN GOOS=linux go build main.go

FROM scratch

WORKDIR /go/src

COPY --from=build go/src/main .

CMD [ "./main" ]