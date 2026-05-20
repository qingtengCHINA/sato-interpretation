// sato 解读 · 双语字典
// 暴露 window.I18N = { zh: {...}, en: {...} }
// 每个 key 对应 HTML 中 data-i18n="key" 元素的 innerHTML（可含内联标签）

window.I18N = {

  zh: {
    'page.title': 'sato 解读 · 一段没有运营者的代码',
    'page.desc':  '用通俗语言一步一步读懂 sato：以太坊上一个没有团队、没有金库、没有管理员的 ERC-20 代币。',

    'logo.sub':       '解读',
    'topbar.wp':      '原版白皮书 ↗',
    'topbar.chain':   '链上 ↗',

    'nav.title': '分布式引导',
    'nav.0': '幽灵又回来了',
    'nav.1': '合约即发行者',
    'nav.2': '储备池才是真本钱',
    'nav.3': '曲线长什么样',
    'nav.4': '三道防割线',
    'nav.5': '优雅地老去',
    'nav.6': '两个池，两种价',
    'nav.7': '买在哪卖在哪',
    'nav.8': '一句话总结',

    'drawer.title': '章节目录 · 分布式引导',

    'hero.badge':       'whitepaper 解读 · 中文版',
    'hero.title.q':     '一个幽灵在以太坊上游荡：',
    'hero.title.e':     '无人运营的代码',
    'hero.sub':         'sato 是以太坊上一个普普通通的 ERC-20。全小写名字，全小写符号，18 位精度。但它有一个不普通的地方——',
    'hero.tag':         '没有团队 · 没有金库 · 没有管理员 · 没有路线图 · 没有 V2',
    'hero.btn.start':   '从第一章开始 →',
    'hero.btn.skip':    '直接看结论',
    'hero.meta.contract': '合约',
    'hero.meta.genesis':  '创世区块',
    'hero.meta.chain':    '链',

    'ch1.title':       '合约即发行者',
    'ch1.lead':        '传统代币靠人发行；sato 靠数学发行。',
    'ch1.card1.intro': '这是一份 ERC-20，但它不像普通代币那样：',
    'ch1.card1.list':
      '<li>不会"先发行后增发"</li>' +
      '<li>没有团队预留份额、没有基金会份额、没有内部投资轮</li>' +
      '<li>没有路线图、没有 V2、没有"迁移到新合约"</li>' +
      '<li>没有管理员，没有暂停按钮，没有升级路径</li>',
    'ch1.card1.emph':  '部署的那一刻，故事就讲完了。剩下的只是合约自己在跑。',
    'ch1.analogy.title': '一个比喻：sato 之于合约，正如比特币之于矿工',
    'ch1.analogy.btc.t': '⛏ 比特币',
    'ch1.analogy.btc.p': '矿工花电、花算力，把<span class="hl">"系统外的努力"</span>换成"系统内的供应"。',
    'ch1.analogy.btc.r': '规则：算力 → POW → 区块奖励',
    'ch1.analogy.sato.t': '🤖 sato',
    'ch1.analogy.sato.p': '买家花 ETH，按曲线把<span class="hl">"系统外的资金"</span>换成"系统内的供应"。',
    'ch1.analogy.sato.r': '规则：ETH → 曲线公式 → 增发 sato',
    'ch1.analogy.foot':   '两者本质相同：用一条公开、可验证的规则，把外部努力变成内部存量。',

    'ch2.title':           '储备池才是真本钱',
    'ch2.lead':            '每一枚 sato 背后都压着一份 ETH。',
    'ch2.flow.buyer':      '买家钱包',
    'ch2.flow.pool':       '合约储备池',
    'ch2.flow.poolSub':    '只进不出（除非 burn）',
    'ch2.flow.seller':     '卖家钱包',
    'ch2.card.title':      '储备池意味着什么？',
    'ch2.card.list':
      '<li><strong>每一枚 sato 都对应一份 ETH 存款</strong>，链上可查</li>' +
      '<li><strong>没有合成代币</strong>——不存在"凭空铸造再去打榜"的版本</li>' +
      '<li><strong>没有人能从池子里提钱</strong>——包括开发者本人</li>' +
      '<li><strong>唯一的出口是 burn</strong>，且按反向曲线计价</li>',
    'ch2.callout':         '说人话：这个池子是 sato 的"金本位"。它就是兑付承诺本身。',

    'ch3.title':       '曲线长什么样',
    'ch3.lead':        '数学决定了每一次铸造和销毁的价格。下面这张图与官网视觉一致，可拖动 / 触摸滑动。',
    'ch3.f1.label':    '铸造曲线（顺向）',
    'ch3.f1.exp':      '累计投入 e 个 ETH，应该有多少 sato 流通在外。',
    'ch3.f2.label':    '单价（mint 边际价）',
    'ch3.f2.exp':      '下一枚 sato 的成本，按指数增长。',
    'ch3.f3.label':    '销毁可得（反向）',
    'ch3.f3.exp':      '从当前供应 q 销毁 b 枚 sato，可以拿回多少 ETH。',
    'ch3.curve.reset': '↺ 当前位置',
    'ch3.curve.foot':
      '<code class="emerald">21m</code> 是数学上的渐近线——曲线会无限逼近但永远不会触及。<br/>' +
      '铸造在原理上可以无限继续，价格随累计 ETH 指数级上升。',
    'ch3.curve.legend':
      '实心绿点 = 当前真实供应（mintedFair）；空心绿圈 = 公式 forward；粉点 = burn 价；' +
      '绿点 = mint 价；垂直虚线 = 当前 ethCum。',
    'ch3.read.title':  '看图说话：',
    'ch3.read.list':
      '<li>开局便宜：刚部署时，少量 ETH 就能换很多 sato；</li>' +
      '<li>越往后越贵：曲线右半段几乎垂直，每多一枚 sato 都要消耗指数倍的 ETH；</li>' +
      '<li>有上限但永远到不了：理论上限 21m sato，价格上限 ∞；</li>' +
      '<li>所以也没人需要"硬顶供应"——曲线自己会让铸造冷下来。</li>',

    'ch4.title': '三道防割线',
    'ch4.lead':  '没有运营者，那靠什么防止机器人和闪电贷把曲线吃干？',
    'ch4.d1.title': '单笔上限 5 ETH',
    'ch4.d1.body':  '每一次 mint 最多花掉 5 ETH。没人能用一笔交易吞下有意义的份额。',
    'ch4.d1.eff':   '→ 巨鲸只能慢慢来，和散户一样。',
    'ch4.d2.title': '同块销毁回滚',
    'ch4.d2.body':  '如果你在同一区块里又 mint 又 burn，交易会被拒绝。',
    'ch4.d2.eff':   '→ 闪电贷套利路径直接被切断。',
    'ch4.d3.title': '开局 100 块的随机税',
    'ch4.d3.body':  '部署后头 100 个区块，每次 mint 都被随机乘 0.9~1.1。',
    'ch4.d3.eff':   '→ 针对部署区块调好的狙击机器人，平均吃 10% 的亏。<br/><span class="muted">（这个窗口已经关闭，现在曲线 100% 确定。）</span>',
    'ch4.d4.title': '0.3% 的"稳定杆"',
    'ch4.d4.body':  '每次 mint 和 burn，两端都收 0.3%。这笔费<strong>永远</strong>留在合约里。',
    'ch4.d4.eff':   '→ 不是金库——它没法被取走、被治理、被投票。它只是一根没人能拔的稳定杆。',

    'ch5.title': '它会优雅地老去',
    'ch5.lead':  '不是关停，是"自然停止铸造"。',
    'ch5.p1.t':  'Bootstrap 阶段',
    'ch5.p1.d':  '曲线是唯一入口，每一笔买卖都和合约直接对手',
    'ch5.p2.t':  '成熟期',
    'ch5.p2.d':  '二级 AMM 池有了深度，曲线变成"必要时才用"的发行者',
    'ch5.p3.t':  '休眠期',
    'ch5.p3.d':  '铸造价 > 市场价，铸造自动停止；销毁仍可以兑付储备',
    'ch5.card':
      '<p>这套设计有一个反直觉的优雅之处：</p>' +
      '<p class="emphasis">没人需要去"关停 sato"。它会在变得无利可图的那一刻自动安静下来。</p>' +
      '<p>但即便铸造停了，<strong>储备池依然存在</strong>，<strong>burn 依然可用</strong>——你想离场，永远有路。</p>',

    'ch6.title':       '两个池，两种命运',
    'ch6.lead':        '在 Uniswap V4 上，sato 同时活在两个池子里。',
    'ch6.curve.title': '曲线池',
    'ch6.curve.body':  '挂着 sato 自家 hook（<code>SatoSwapRouter</code> 的目标）',
    'ch6.curve.list':
      '<li>买/卖按公式定价（顺向 / 反向曲线）</li>' +
      '<li>mint = 买方向，burn = 卖方向</li>' +
      '<li>会真的<strong>改变 totalSupply</strong></li>' +
      '<li>会真的<strong>动用储备池</strong></li>',
    'ch6.sec.title':   '二级池 sato/usdt',
    'ch6.sec.body':    '普通的 V4 池，AMM 流动性提供者撑起来的。',
    'ch6.sec.list':
      '<li>买/卖按市场撮合定价</li>' +
      '<li>不改变 totalSupply</li>' +
      '<li>不动储备池</li>' +
      '<li>大多数交易所、聚合器走这里</li>',
    'ch6.note':        '<strong>关键认知：</strong> "burn 销毁"不是网站功能，而是<strong>对曲线池的一次特定 swap</strong>。任何走曲线池的卖单都会触发 burn；任何走二级池的卖单都不会。',

    'ch7.title':    '买在哪？卖在哪？',
    'ch7.lead':     '两个池子有两套报价，差价时不时会反转。',
    'ch7.qf.title': '曲线 burn 报价（每枚 sato 能换多少 ETH）',
    'ch7.qf.code':  'burn_price (ETH/sato)\n' +
                    '  = (S / (K − mintedFair))            ← 当前位置的反向边际价\n' +
                    '  · (mintedFair / totalSupply)        ← 名义/真实供应量修正\n' +
                    '  · (1 − 0.003)                       ← 0.3% 协议费（留在储备里）',
    'ch7.dt.h1':    '情况',
    'ch7.dt.h2':    '建议路径',
    'ch7.dt.h3':    '为什么',
    'ch7.dt.r1.s':  '市场冷清，二级出价稀薄',
    'ch7.dt.r1.p':  '走曲线 burn',
    'ch7.dt.r1.w':  '合约永远报价，是天然的"最后买家"',
    'ch7.dt.r2.s':  '成熟期，二级 LP 报价紧凑',
    'ch7.dt.r2.p':  '走二级 swap',
    'ch7.dt.r2.w':  '市场价通常优于反向曲线（曲线还有 0.3% 摩擦）',
    'ch7.dt.r3.s':  '买入时',
    'ch7.dt.r3.p':  '比较两边报价',
    'ch7.dt.r3.w':  '在 sat0.org 看曲线 mint 价；二级看 Uniswap',
    'ch7.note':     '小提示：聚合器（1inch / 0x / paraswap / Uniswap Router）默认走二级池。要走曲线必须直连 <code>SatoSwapRouter</code>。',

    'ch8.title':     '一句话总结',
    'ch8.manifesto':
      '如果今晚部署 sato 的人全部消失，<br/>' +
      '明天这份合约依然按同样的规则、同样的价格继续运行。<br/>' +
      '<span class="emerald">这就是「无运营者」的全部含义。它是 sato 的唯一特性。</span>',
    'ch8.proof.title': '链上证据',
    'ch8.cta.trade':   '前往 sat0.org 交易',
    'ch8.cta.read':    '读原版白皮书',

    'footer':          '本页是对 sat0.org/whitepaper 的中文通俗解读，非官方。所有数据请以链上和官方页面为准。',
  },

  en: {
    'page.title': 'sato explained · code that runs without an operator',
    'page.desc':  'A plain-English walkthrough of sato: an ERC-20 on Ethereum with no team, no treasury, no admin keys.',

    'logo.sub':       'explained',
    'topbar.wp':      'whitepaper ↗',
    'topbar.chain':   'on-chain ↗',

    'nav.title': 'progressive guide',
    'nav.0': 'the specter returns',
    'nav.1': 'the contract is the issuer',
    'nav.2': 'the reserve is the real backing',
    'nav.3': 'what the curve looks like',
    'nav.4': 'three lines of defense',
    'nav.5': 'growing old gracefully',
    'nav.6': 'two pools, two prices',
    'nav.7': 'where to buy, where to sell',
    'nav.8': 'one-line summary',

    'drawer.title': 'table of contents · progressive guide',

    'hero.badge':       'whitepaper explained · english',
    'hero.title.q':     'a specter haunting ethereum:',
    'hero.title.e':     'code that runs without an operator',
    'hero.sub':         'sato is a perfectly ordinary ERC-20 on ethereum. lowercase name, lowercase symbol, eighteen decimals. but it has one unusual property——',
    'hero.tag':         'no team · no treasury · no admin · no roadmap · no v2',
    'hero.btn.start':   'start from chapter 01 →',
    'hero.btn.skip':    'skip to the conclusion',
    'hero.meta.contract': 'contract',
    'hero.meta.genesis':  'genesis block',
    'hero.meta.chain':    'chain',

    'ch1.title':       'the contract is the issuer',
    'ch1.lead':        'traditional tokens are issued by people; sato is issued by math.',
    'ch1.card1.intro': 'this is an ERC-20, but it is unlike ordinary tokens:',
    'ch1.card1.list':
      '<li>no "issue first, mint more later"</li>' +
      '<li>no team allocation, no foundation share, no insider round</li>' +
      '<li>no roadmap, no v2, no "migration to a new contract"</li>' +
      '<li>no admin, no pause button, no upgrade path</li>',
    'ch1.card1.emph':  'the moment it is deployed, the story is over. all that is left is the contract running on its own.',
    'ch1.analogy.title': 'an analogy: sato is to its contract what bitcoin is to its miners',
    'ch1.analogy.btc.t': '⛏ bitcoin',
    'ch1.analogy.btc.p': 'miners spend electricity and hash power, converting <span class="hl">"effort outside the system"</span> into "supply inside the system".',
    'ch1.analogy.btc.r': 'rule: hash power → POW → block reward',
    'ch1.analogy.sato.t': '🤖 sato',
    'ch1.analogy.sato.p': 'buyers spend ETH and, along the curve, convert <span class="hl">"capital outside the system"</span> into "supply inside the system".',
    'ch1.analogy.sato.r': 'rule: ETH → curve formula → new sato issued',
    'ch1.analogy.foot':   'the essence is the same: a transparent, verifiable rule that turns external effort into internal stock.',

    'ch2.title':           'the reserve is the real backing',
    'ch2.lead':            'every sato is backed by an ETH deposit on-chain.',
    'ch2.flow.buyer':      'buyer wallet',
    'ch2.flow.pool':       'contract reserve',
    'ch2.flow.poolSub':    'only flows out via burn',
    'ch2.flow.seller':     'seller wallet',
    'ch2.card.title':      'what does the reserve mean?',
    'ch2.card.list':
      '<li><strong>every sato corresponds to a real ETH deposit</strong>, verifiable on-chain</li>' +
      '<li><strong>no synthetic supply</strong> — no version that "mints out of thin air"</li>' +
      '<li><strong>no one can withdraw from the pool</strong> — including the developers</li>' +
      '<li><strong>the only exit is burn</strong>, priced by the inverse curve</li>',
    'ch2.callout':         'in plain words: the reserve is sato\'s "gold standard." it IS the redemption promise.',

    'ch3.title':       'what the curve looks like',
    'ch3.lead':        'math decides the price of every mint and every burn. the chart below mirrors the official site visually — drag or touch to scrub.',
    'ch3.f1.label':    'mint curve (forward)',
    'ch3.f1.exp':      'with cumulative ETH input e, how many sato should be circulating.',
    'ch3.f2.label':    'unit price (mint marginal)',
    'ch3.f2.exp':      'cost of the next sato — grows exponentially.',
    'ch3.f3.label':    'burn redemption (inverse)',
    'ch3.f3.exp':      'from current supply q, how much ETH you receive for burning b sato.',
    'ch3.curve.reset': '↺ live position',
    'ch3.curve.foot':
      '<code class="emerald">21m</code> is the mathematical asymptote — the curve approaches it but never touches it.<br/>' +
      'minting can in principle continue indefinitely; price grows exponentially with cumulative ETH.',
    'ch3.curve.legend':
      'filled green dot = current real supply (mintedFair); hollow green ring = formula forward; pink dot = burn price; ' +
      'green dot = mint price; vertical dashed line = current ethCum.',
    'ch3.read.title':  'reading the chart:',
    'ch3.read.list':
      '<li>cheap at the start: just after deploy, a little ETH buys a lot of sato;</li>' +
      '<li>steeper later: the right half is nearly vertical — each extra sato costs exponentially more ETH;</li>' +
      '<li>bounded but never reached: theoretical cap 21m sato, price cap ∞;</li>' +
      '<li>so no one needs a "hard cap" — the curve itself cools minting down.</li>',

    'ch4.title': 'three lines of defense',
    'ch4.lead':  'with no operator, what stops bots and flash loans from draining the curve?',
    'ch4.d1.title': 'per-mint cap of 5 ETH',
    'ch4.d1.body':  'each mint can spend at most 5 ETH. no one can swallow a meaningful share of supply in a single transaction.',
    'ch4.d1.eff':   '→ whales have to buy slowly, just like retail.',
    'ch4.d2.title': 'same-block burn revert',
    'ch4.d2.body':  'if you mint and burn within the same block, the transaction reverts.',
    'ch4.d2.eff':   '→ the flash-loan arbitrage path is closed.',
    'ch4.d3.title': '100-block random tax at launch',
    'ch4.d3.body':  'in the first 100 blocks after deploy, every mint was multiplied by a random factor between 0.9 and 1.1.',
    'ch4.d3.eff':   '→ snipers tuned for the exact deploy block lost ~10% on average.<br/><span class="muted">(that window has closed; the curve is now 100% deterministic.)</span>',
    'ch4.d4.title': 'the 0.3% "stabilizer"',
    'ch4.d4.body':  'every mint and every burn pay 0.3% on each side. this fee stays in the contract <strong>permanently</strong>.',
    'ch4.d4.eff':   '→ it is not a treasury — it cannot be withdrawn, governed, or voted on. it is just a stabilizer that no one can pull out.',

    'ch5.title': 'it grows old gracefully',
    'ch5.lead':  'not a shutdown — a natural slowdown of minting.',
    'ch5.p1.t':  'bootstrap',
    'ch5.p1.d':  'the curve is the only entry; every trade is direct counterparty with the contract',
    'ch5.p2.t':  'mature',
    'ch5.p2.d':  'secondary AMM pools have depth; the curve becomes the "issuer of last resort"',
    'ch5.p3.t':  'dormant',
    'ch5.p3.d':  'mint price > market price, minting halts on its own; burn still redeems against the reserve',
    'ch5.card':
      '<p>there is a counterintuitive elegance to this design:</p>' +
      '<p class="emphasis">no one has to "shut sato down." it quietens itself the moment minting becomes unprofitable.</p>' +
      '<p>even when minting stops, <strong>the reserve is still there</strong> and <strong>burn still works</strong> — there is always an exit.</p>',

    'ch6.title':       'two pools, two fates',
    'ch6.lead':        'on Uniswap V4, sato lives in two pools at once.',
    'ch6.curve.title': 'curve pool',
    'ch6.curve.body':  'has sato\'s own hook attached (the target of <code>SatoSwapRouter</code>)',
    'ch6.curve.list':
      '<li>buy/sell priced by formula (forward / inverse curve)</li>' +
      '<li>mint = buy direction, burn = sell direction</li>' +
      '<li>actually <strong>changes totalSupply</strong></li>' +
      '<li>actually <strong>moves the reserve</strong></li>',
    'ch6.sec.title':   'secondary pool sato/usdt',
    'ch6.sec.body':    'a regular V4 pool, supplied by AMM liquidity providers.',
    'ch6.sec.list':
      '<li>buy/sell priced by market matching</li>' +
      '<li>does not change totalSupply</li>' +
      '<li>does not move the reserve</li>' +
      '<li>most exchanges and aggregators route here</li>',
    'ch6.note':        '<strong>key insight:</strong> "burn" is not a website feature; it is <strong>a specific swap against the curve pool</strong>. any sell that routes through the curve pool will burn; any sell that routes through the secondary pool will not.',

    'ch7.title':    'where to buy? where to sell?',
    'ch7.lead':     'two pools have two prices — and which one is better can flip.',
    'ch7.qf.title': 'curve burn quote (ETH per sato)',
    'ch7.qf.code':  'burn_price (ETH/sato)\n' +
                    '  = (S / (K − mintedFair))            ← inverse marginal price at the current position\n' +
                    '  · (mintedFair / totalSupply)        ← nominal/real supply correction\n' +
                    '  · (1 − 0.003)                       ← 0.3% protocol fee retained in the reserve',
    'ch7.dt.h1':    'situation',
    'ch7.dt.h2':    'recommended route',
    'ch7.dt.h3':    'why',
    'ch7.dt.r1.s':  'market is cold, secondary bids are thin',
    'ch7.dt.r1.p':  'use curve burn',
    'ch7.dt.r1.w':  'the contract always quotes — it is the natural buyer of last resort',
    'ch7.dt.r2.s':  'mature regime, secondary LP quotes are tight',
    'ch7.dt.r2.p':  'use secondary swap',
    'ch7.dt.r2.w':  'market price usually beats the inverse curve (curve also has 0.3% friction)',
    'ch7.dt.r3.s':  'buying',
    'ch7.dt.r3.p':  'compare both quotes',
    'ch7.dt.r3.w':  'see curve mint price on sat0.org; secondary on Uniswap',
    'ch7.note':     'tip: aggregators (1inch / 0x / paraswap / Uniswap Router) route through the secondary pool by default. to hit the curve, you must call <code>SatoSwapRouter</code> directly.',

    'ch8.title':     'one-line summary',
    'ch8.manifesto':
      'if everyone who deployed sato disappeared tonight,<br/>' +
      'tomorrow this contract would still run by the same rules and the same prices.<br/>' +
      '<span class="emerald">that is the entire meaning of "no operator". it is sato\'s only feature.</span>',
    'ch8.proof.title': 'on-chain proof',
    'ch8.cta.trade':   'go trade on sat0.org',
    'ch8.cta.read':    'read the whitepaper',

    'footer':          'this page is an unofficial plain-English walkthrough of sat0.org/whitepaper. always defer to on-chain data and the official site.',
  }
};
