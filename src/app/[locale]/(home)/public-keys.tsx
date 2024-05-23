'use client'

import openpgp from '@/components/default/key/openpgp'
import ed25519 from '@/components/default/key/ed25519'
import curve25519 from '@/components/default/key/curve25519'
import prime256v1 from '@/components/default/key/prime256v1'
import secp256k1 from '@/components/default/key/secp256k1'
import descriptions from '@/components/default/key/descriptions'

const PublicKeys = () => {
  return (
    <div className="public-keys">
      <hr />
      <h4>GnuPG_OpenPGP [SCAE]-primary</h4>
      <pre>{openpgp}</pre>

      <h4>ECC_EDDSA_ED25519 [SCA]-primary</h4>
      <pre>{ed25519}</pre>

      <h4>ECDH_CURVE25519 [E]-primary</h4>
      <pre>{curve25519}</pre>

      <h4>ECC_NIST_P256 [SC]-secondary</h4>
      <pre>{prime256v1}</pre>

      <h4>ECC_SECG_P256K1 [SE]-secondary</h4>
      <pre>{secp256k1}</pre>
      <pre>{descriptions}</pre>
    </div>
  )
}

export default PublicKeys
