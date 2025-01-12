# jot

![image](https://github.com/user-attachments/assets/b7101e4e-4039-4f92-a309-4b753e1f8347)

sometimes i just need to jot stuff down. this is not intended to be a fully fledged knowledgebase/note taking system/bookmark manager/whatever else it could be. just something to save little bibs and bobs and then throw them away when you don't need them any more.

## installation

### docker

```bash
docker run --rm \
  -v ./:/app/data \
  -p 3000:3000 \
  ghcr.io/s992/jot:latest
```

### binary

binaries are provided for each release. right now it's just linux amd64 because i can't figure out how to build with `CGO_ENABLED` for other platforms. download from here and put it wherever you need it.

## usage

### environment variables

- `JOT_PORT`: port the app will run on. defaults to 3000
- `JOT_DB_DIR`: location of the database directory. defaults to `/app/data`. if you're using the docker image, you probably won't need to set this

### running

#### docker

see above under [install](#install)

#### binary

```bash
JOT_DB_DIR=./ /path/to/jot
```

### using

- navigate to https://your.domain.or.ip.local:3000
- press `?` for help
