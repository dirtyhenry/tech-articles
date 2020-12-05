clean:
	git clean -dfX

install-deploy:
	bundle install

install: install-deploy
	yarn install

update:
	bundle update

package-js:
	yarn run webpack

build:
	bundle exec jekyll build

run: package-js
	bundle exec jekyll serve

lint:
	bundle exec rubocop
	bundle exec mdl _posts/
	bundle exec htmlproofer --assume-extension --http-status-ignore "999" --check_img_http ./_site

lintfix:
	yarn prettier -w _posts _javascript
