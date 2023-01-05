// 正则表达式匹配
// https://leetcode-cn.com/problems/regular-expression-matching/
var isMatch = function(s, p) {
  const handleP = (p) => {
    const rules = []
    const advance = n => {
      p = p.substring(n)
    };
    while(p) {
      if (p.length > 1 && p[1] === '*') {
        rules.push({
          type: 'multiple',
          value: p[0] === '.' ? '.' : p[0]
        })
        advance(2)
        continue
      }

      if (p[0] === '.') {
        rules.push({
          type: 'any',
          value: '.'
        })
        advance(1)
        continue
      }

      if (p[0]) {
        rules.push({
          type: 'value',
          value: p[0]
        })
        advance(1)
        continue
      }
    }
    return rules
  }
  const rules = handleP(p)

  const handleS = (s, rules) => {
    let result = true
    const advance = n => {
      s = s.substring(n)
    };
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      if (s.length === 0) { // 字符串匹配完后，还有留存的非*规则
        let hasNeedHandleRule = false
        for(let j = i + 1; j < rules.length; j++) {
          if (rules[j].type !== 'multiple') {
            hasNeedHandleRule = true
            break
          }
        }
        if (hasNeedHandleRule) {
          result = false
          break
        }
      }

      if (rule.type === 'multiple') {
        const getNum = () => {
          let num = 0
          for (let j = 0; j < s.length; j++) {
            if (s[j] === rule.value || rule.value === '.') {
              num++
            } else {
              break
            }
          }

          // multiple匹配，需后望
          if (i !== rules.length - 1 && num > 0) {
            for(let j = num; j > 0; j--) {
              const watchStr = s.slice(num - j)
              const watchRules = rules.slice(i + 1)
              const res = handleS(watchStr, watchRules)
              if (res) {
                num = num - j
                break
              }
            }
          }
          return num
        }
        const num = getNum()
        if (num >= 0) {
          advance(num)
          result = true
        } else {
          result = false
          break
        }
      }

      if (rule.type === 'any') {
        const match = !!s[0]
        if (match) {
          result = true
          advance(1)
        } else {
          result = false
          break
        }
      }

      if (rule.type === 'value') {
        const match = s[0] === rule.value
        if (match) {
          result = true
          advance(1)
        } else {
          result = false
          break
        }
      }
    }

    if (s.length) { // 规则执行完后，还有留存的字符串
      result = false
    }

    return result
  }
  const result = handleS(s, rules)
  console.log("🚀 ~ file: regular.js ~ line 128 ~ isMatch ~ result", result)

  return result
};

isMatch('aaaa', 'a*a*')
