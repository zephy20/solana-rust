const anchor = require('@project-serum/anchor');

const {SystemProgram} = anchor.web3;

const main = async() => {
  console.log('test start');

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Solanarust;

  const baseAccount = anchor.web3.Keypair.generate();

  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId
    },
    signers: [baseAccount]
  });

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('count', account.totalGifs.toString())

  console.log('txn signature', tx)

  await program.rpc.addGif('https://tenor.com/brZOY.gif', {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey
    }
  })

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('updated count', account.gifList)
}

const runMain = async () => {
  try {
    await main();
    console.log('done')
    process.exit(0);
  } catch (e) {
    console.log(e,'huhhh');
    process.exit(1)
  }
}

runMain();  