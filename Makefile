clean:
	# Run `git clean -dfX -n` to maintain
	rm -f .DS_Store
	rm -rf .jekyll-cache
	rm -rf _site
	rm -rf node_modules

install-deploy:
	bundle install

install: install-deploy
	npm install

update:
	bundle update

package-js:
	npm run webpack

build:
	bundle exec jekyll build

run: package-js
	bundle exec jekyll serve

lint:
	bundle exec rubocop
	bundle exec mdl _posts/
	bundle exec htmlproofer --assume-extension --http-status-ignore "999" --check_img_http ./_site

lintfix:
	npm run prettier
