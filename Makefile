CWD := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
RUN := docker run -it --rm -v ${CWD}:/project -w /project
IMG := simbo/node:8.11-alpine

.PHONY: build
build: check-install ## build for production
	@${RUN} ${IMG} yarn run build:prod

.PHONY: dev
dev: check-install ## start webpack dev server
	${RUN} -p 9000:9000 ${IMG} yarn run serve:dev

.PHONY: serve
serve: check-install ## start webpack dev server in production mode
	@${RUN} -p 9000:9000 ${IMG} yarn run serve:prod

.PHONY: test
test: check-install # run tests
	@${RUN} ${IMG} yarn run test

.PHONY: build-ci
build-ci: check-install # build for production optimized for ci env
	@${RUN} ${IMG} yarn run build:ci

.PHONY: shell
shell: ## open a node container shell
	@${RUN} ${IMG} sh -l

.PHONY: install
install: # install node_modules
	@${RUN} ${IMG} yarn install

.PHONY: check-install
check-install: # install if node_modules doesn't exist or lockfile changed
	@if [ ! -d "node_modules" ] || ! cmp -s yarn.lock .make-yarn-state; then\
		$(MAKE) install && cp -pf yarn.lock .make-yarn-state;\
	fi

.DEFAULT_GOAL :=
.PHONY: help
help: # help text auto-generated from comments
	@echo "\nUsage: \033[1;37mmake <target>\033[0m\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk \
		'BEGIN {FS = ":.*?## "}; {printf "\033[0;36m%s\033[0m \033[0;37m→\033[0m %s\n", $$1, $$2}'
	@echo ""
