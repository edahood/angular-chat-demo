
# get Makefile directory name: http://stackoverflow.com/a/5982798/376773
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# applications
NODE ?= $(shell which nodejs)

DIST_DIR := $(THIS_DIR)/public
DEV_DIR := $(THIS_DIR)/angular-frontend



install: dist
clean:
	@rm -rf $(DIST_DIR)

dist: clean
	@echo DEVDIR IS: $(DEV_DIR)
	@cd $(DEV_DIR) && grunt build
	@cd $(DIST_DIR)/..

.PHONY: dist
