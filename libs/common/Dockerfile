# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build common`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t common`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system common && \
          adduser --system -G common common

COPY dist/libs/common common
RUN chown -R common:common .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix common --omit=dev -f install

CMD [ "node", "common" ]
