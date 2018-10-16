const assert = require('assert');
const types = require('../src/auth/serializer/src/types');
const ops = require('../src/auth/serializer/src/operations');

describe('scorum.auth: operation test', () => {
  it('templates', () => {
    for (const op in ops) {
      switch (op) {
        case 'operation':
          continue;
      }
      template(ops[op]);
    }
  });

  it('account_create', () => {
    const tx = {
      ref_block_num: 19297,
      ref_block_prefix: 1608085982,
      expiration: '2016-03-23T22:41:21',
      operations: [
        [
          'account_create',
          {
            fee: '0.000000000 SCR',
            creator: 'initminer',
            new_account_name: 'andrew',
            owner: { weight_threshold: 1, account_auths: [], key_auths: [['SCR7DTS62msowgpAZJBNRMStMUt5bfRA4hc9j5wjwU4vKhi3KFkKb', 1]] },
            active: { weight_threshold: 1, account_auths: [], key_auths: [['SCR8k1f8fvHxLrCTqMdRUJcK2rCE3y7SQBb8PremyadWvVWMeedZy', 1]] },
            posting: { weight_threshold: 1, account_auths: [], key_auths: [['SCR6DgpKJqoVGg7o6J1jdiP45xxbgoUg5VGzs96YBxX42NZu2bZea', 1]] },
            memo_key: 'SCR6ppNVEFmvBW4jEkzxXnGKuKuwYjMUrhz2WX1kHeGSchGdWJEDQ',
            json_metadata: ''
          }
        ]
      ],
      extensions: [],
      signatures: []
    };

    const tx_hex =
      '614bde71d95f911bf35601060000000000000000095343520000000009696e69746d696e657206616e647265770100000000010332757668fa45c2bc21447a2ff1dc2bbed9d9dda1616fd7b700255bd28e9d674a010001000000000103fb8900a262d51b908846be54fcf04b3a80d12ee749b9446f976b58b220ba4eed010001000000000102af4963d0f034043f4b4b0c99220e6a4b5d8b9cc71e5cd7d110f7602f3a0a11d1010002ff0de11ef55b998daf88047f1a00a60ed5dffb0c23c3279f8bd42a733845c5da000000';

    // 53 43 52
    assert.equal('SCR', new Buffer('534352', 'hex').toString());
    const tx_object1 = ops.signed_transaction.fromObject(tx);
    const tx_object2 = ops.signed_transaction.fromHex(tx_hex);

    assert.deepEqual(tx, ops.signed_transaction.toObject(tx_object1));
    assert.deepEqual(tx, ops.signed_transaction.toObject(tx_object2));
    assert.deepEqual(tx_hex, ops.signed_transaction.toHex(tx_object1));
    assert.deepEqual(tx_hex, ops.signed_transaction.toHex(tx_object2));
  });

  it('create_budget', () => {
    const tx = {
      type: 0,
      uuid: '6dcd3132-e5df-480a-89a8-91984bca0a09',
      owner: 'initdelegate',
      json_metadata: '{}',
      balance: '10.000000000 SCR',
      start: '2018-08-03T10:12:43',
      deadline: '2018-08-03T10:13:13'
    };

    const tx_hex =
      '00000000000000006dcd3132e5df480a89a891984bca0a090c696e697464656c6567617465027b7d00e40b540200000009534352000000009b2a645bb92a645b';
    const tx_object1 = ops.create_budget.fromObject(tx);
    const tx_object2 = ops.create_budget.fromHex(tx_hex);

    assert.deepEqual(tx, ops.create_budget.toObject(tx_object1));
    assert.deepEqual(tx, ops.create_budget.toObject(tx_object2));
    assert.deepEqual(tx_hex, ops.create_budget.toHex(tx_object1));
    assert.deepEqual(tx_hex, ops.create_budget.toHex(tx_object2));
  });
});

function template(op) {
  assert(op.toObject({}, { use_default: true }));
  assert(op.toObject({}, { use_default: true, annotate: true }));
}
