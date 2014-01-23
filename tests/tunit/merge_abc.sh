#! /bin/sh
cd ~/code/jalangi-master
node src/js/instrument/esnstrument.js tests/tunit/a.js tests/tunit/b.js tests/tunit/c.js
cat tests/tunit/a_t_.js tests/tunit/b_t_.js tests/tunit/c_t_.js > tests/tunit/abc_merge.js
