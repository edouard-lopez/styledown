/* jshint expr: true */

const { exec, spawn } = require('child_process')
exports.bin = './bin/styledown.js'

/**
 * runs(): runs
 *
 *   describe('running', function () {
 *     run('--help');
 *     success();
 *   });
 */

exports.run = function (args) {
  before(function (next) {
    exec(`${exports.bin  } ${  args}`, function (_exit, _cout, _cerr) {
      global.result = {
        code: _exit && _exit.code || 0,
        error: _exit,
        out: _cout,
        stripped: _cout.replace(/\033\[[^m]*m/g, ''),
        stderr: _cerr
      }
      next()
    })
  })

  after(function () {
    delete global.result
  })
}

/**
 * success(): asserts success
 *
 *   describe('running', function () {
 *     run('--help');
 *     success();
 *   });
 */

exports.success = function () {
  it('is successful', function () {
    expect(global.result.code).eql(0)
    expect(global.result.error).to.not.exist // null and undefined
  })
}

/**
 * pipe(): runs and pipes things into stdin
 *
 *   describe('pipes', function () {
 *     pipe('var x = 2', ['--no-pager'])
 *     success();
 *   });
 */

exports.pipe = function (input, args) {
  before(function (next) {
    let child = spawn(exports.bin, args || [], { stdio: 'pipe' })
    let result = global.result = { out: '', stderr: '' }

    if (input) {
      child.stdin.write(input)
      child.stdin.end()
    }

    child.stdout.on('data', function (data) { result.out += data })
    child.stderr.on('data', function (data) { result.stderr += data })
    child.on('close', function (code) {
      result.code = code
      next()
    })
  })

  after(function () {
    delete global.result
  })
}
