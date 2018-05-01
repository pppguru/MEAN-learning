BIN = ./node_modules/.bin

install-deps:
	@echo "Installing dependencies..."
	@npm install

build: install-deps clean
	@echo "Building application artifacts..."
	@$(BIN)/webpack --progress --colors --display-error-details
	
buildprod: install-deps clean
	@echo "Building prod app artificats..."
	@$(BIN)/webpack --config webpack.prod.js --progress --colors --display-error-details	

test: install-deps
	@echo "Running tests..."
	@$(BIN)/karma start

clean:
	@echo "Removing application artifacts..."
	@NODE_ENV=test rm -rf ./dist

 clean-deps:
	@echo "Deleting dependencies..."
	@rm -rf ./node_modules


.PHONY: install-dev-deps install-deps build test clean
