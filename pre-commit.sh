#!/bin/bash

unit_test_result=0
eslint_result=0

check_unit_test () {
  npm test
  return $?
}

check_eslint () {
  files=$(git diff --cached --name-only | grep '\.js$')
  # --cached 对比的是缓存区和当前 HEAD 之间差异
  # 否则对比的就是工作区和当前 HEAD 之间的差异

  # Prevent ESLint help message if no files matched
  if [[ $files = "" ]] ; then
      return 0
  fi

  for file in ${files}; do
      git show :$file | ./node_modules/.bin/eslint $file
      if [[ $? != 0 ]] ; then
          eslint_result=1
      fi
  done;

  return $eslint_result
}

check_unit_test
unit_test_result=$?

check_eslint
eslint_result=$?

if [[ $eslint_result != 0 ]] ; then
  echo "🚫  ESLint failed!"
else
  echo "👍  ESlint success!"
fi

if [[ $unit_test_result != 0 ]] ; then
  echo "🚫  UnitTest failed!"
else
  echo "👍  UnitTest success!"
fi

if [[ $(($eslint_result+$unit_test_result)) != 0 ]] ; then
  echo "🚫  git commit denied!"
  exit 1
else
  echo "👍  Commit success!"
  exit 0
fi
