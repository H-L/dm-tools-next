# Tiles server

This the `README` for the tiles server, built with Flask, since gdal2tiles only exists as a Python Script.

## TODO

- [ ] Add `pipenv` support for this project

## Generate maps

Install `gdal` and `gdal2tiles`

```bash
pip install gdal
pip install gdal2tiles
```

And then have fun with the commands described in the library :

https://gdal.org/programs/gdal2tiles.html

One command that seems to work quite well :

```bash
gdal2tiles.py -p raster --xyz -z 0-5 -w leaflet /path/to/image public/images/tiles/
```

### Other useful ressources for GDAL

- [Install gdal on macos](https://mits003.github.io/studio_null/2021/07/install-gdal-on-macos/) -> If you want the server to run locally without the docker image.

## Useful articles / ressources

- [Developing RESTful APIs with Python and Flask](https://auth0.com/blog/developing-restful-apis-with-python-and-flask/)
