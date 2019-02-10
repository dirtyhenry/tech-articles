install:
	bundle install

update:
	bundle update

build:
	bundle exec jekyll build

run:
	bundle exec jekyll serve

lint:
	htmlproofer --assume-extension --http-status-ignore "999" --check_img_http ./_site
