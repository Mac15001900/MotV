correct x y = zip x y |> count (uncurry (==))
partial xs ys = count (\x-> elem x ys) xs |> subtract (correct xs ys)
fits x (s,c,p) = (correct x s == c) && (partial x s == p)
solves s p = map (fits s) p |> and

pad0 x = if length x >= 4 then x else pad0 ('0':x)
solutions p = [1..9999] |> map show |> map pad0 |> filter ((flip solves) p)

puzzle = [("2501",2,0), ("2398",1,0), ("4569",1,1), ("7106",1,1)]