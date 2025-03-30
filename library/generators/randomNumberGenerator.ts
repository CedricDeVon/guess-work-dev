import prand from 'pure-rand'

import { Generator } from './generator'
import { Result } from '@/library/results/result'
import { SuccessfulResult } from '@/library/results/successfulResult'

export class RandomNumberGenerator extends Generator {
    public static readonly singleton: RandomNumberGenerator = new RandomNumberGenerator()

    private constructor() {
        super()
    }

    public generate(): Result {
        return new SuccessfulResult(prand.uniformIntDistribution(
            1, 100, prand.xoroshiro128plus(
                Date.now() ^ (Math.random() * 0x100000000)))[0]) 
    }
}
