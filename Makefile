clean:
	git clean -dfX

install:
	bundle install
	yarn install

update:
	bundle update

build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve

lint:
	bundle exec rubocop
	# bundle exec mdl .
	htmlproofer --assume-extension --http-status-ignore "999" --check_img_http ./_site
