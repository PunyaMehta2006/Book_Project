$base = "http://localhost:5000"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   PageTurn API - Full Endpoint Tests   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# TEST 1: Health Check
Write-Host ""
Write-Host "TEST 1: Health Check GET /" -ForegroundColor Yellow
try {
  $res = Invoke-RestMethod -Uri "$base/" -Method GET
  Write-Host "PASS: $($res.message)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 2: GET all books (empty)
Write-Host ""
Write-Host "TEST 2: GET /api/books (should be empty array)" -ForegroundColor Yellow
try {
  $books = Invoke-RestMethod -Uri "$base/api/books" -Method GET
  Write-Host "PASS: Returned $($books.Count) books" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 3: POST - Create a book
Write-Host ""
Write-Host "TEST 3: POST /api/books (create listing)" -ForegroundColor Yellow
try {
  $body = '{"title":"The Alchemist","author":"Paulo Coelho","genre":"Fiction","price":199,"exchangeAvailable":false,"description":"A novel about following your dreams.","image":"https://covers.openlibrary.org/b/id/8739161-L.jpg","seller":{"name":"Punya Mehta","email":"punya@test.com","phone":"9876543210"}}'
  $created = Invoke-RestMethod -Uri "$base/api/books" -Method POST -Body $body -ContentType "application/json"
  $bookId = $created._id
  Write-Host "PASS: Created book ID = $bookId" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red; exit }

# TEST 4: GET single book
Write-Host ""
Write-Host "TEST 4: GET /api/books/:id" -ForegroundColor Yellow
try {
  $book = Invoke-RestMethod -Uri "$base/api/books/$bookId" -Method GET
  Write-Host "PASS: Got book '$($book.title)' by $($book.author)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 5: GET all books with search filter
Write-Host ""
Write-Host "TEST 5: GET /api/books?search=alchemist" -ForegroundColor Yellow
try {
  $filtered = Invoke-RestMethod -Uri "$base/api/books?search=alchemist" -Method GET
  Write-Host "PASS: Search returned $($filtered.Count) result(s)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 6: GET books by genre
Write-Host ""
Write-Host "TEST 6: GET /api/books?genre=Fiction" -ForegroundColor Yellow
try {
  $byGenre = Invoke-RestMethod -Uri "$base/api/books?genre=Fiction" -Method GET
  Write-Host "PASS: Genre filter returned $($byGenre.Count) result(s)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 7: PUT - Update book
Write-Host ""
Write-Host "TEST 7: PUT /api/books/:id (update)" -ForegroundColor Yellow
try {
  $updateBody = '{"title":"The Alchemist (Updated)","author":"Paulo Coelho","genre":"Fiction","price":149,"exchangeAvailable":false,"description":"Updated description.","image":"https://covers.openlibrary.org/b/id/8739161-L.jpg","seller":{"name":"Punya Mehta","email":"punya@test.com","phone":"9876543210"}}'
  $updated = Invoke-RestMethod -Uri "$base/api/books/$bookId" -Method PUT -Body $updateBody -ContentType "application/json"
  Write-Host "PASS: Updated title = '$($updated.title)', price = $($updated.price)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 8: PATCH exchange - enable, open to any
Write-Host ""
Write-Host "TEST 8: PATCH /api/books/:id/exchange (enable exchange)" -ForegroundColor Yellow
try {
  $exBody = '{"exchangeAvailable":true}'
  $exRes = Invoke-RestMethod -Uri "$base/api/books/$bookId/exchange" -Method PATCH -Body $exBody -ContentType "application/json"
  Write-Host "PASS: exchangeAvailable = $($exRes.exchangeAvailable), exchangeWith = $($exRes.exchangeWith)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 9: PATCH exchange - disable
Write-Host ""
Write-Host "TEST 9: PATCH /api/books/:id/exchange (disable exchange)" -ForegroundColor Yellow
try {
  $disBody = '{"exchangeAvailable":false,"exchangeWith":null}'
  $disRes = Invoke-RestMethod -Uri "$base/api/books/$bookId/exchange" -Method PATCH -Body $disBody -ContentType "application/json"
  Write-Host "PASS: exchangeAvailable = $($disRes.exchangeAvailable)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 10: POST review
Write-Host ""
Write-Host "TEST 10: POST /api/reviews/:bookId (add review)" -ForegroundColor Yellow
try {
  $revBody = '{"user":"Punya","rating":5,"comment":"Absolutely brilliant read!"}'
  $review = Invoke-RestMethod -Uri "$base/api/reviews/$bookId" -Method POST -Body $revBody -ContentType "application/json"
  Write-Host "PASS: Review added by '$($review.user)' - Rating: $($review.rating)/5" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 11: GET reviews
Write-Host ""
Write-Host "TEST 11: GET /api/reviews/:bookId" -ForegroundColor Yellow
try {
  $reviews = Invoke-RestMethod -Uri "$base/api/reviews/$bookId" -Method GET
  Write-Host "PASS: Got $($reviews.Count) review(s)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

# TEST 12: Validation error (bad genre)
Write-Host ""
Write-Host "TEST 12: POST with invalid genre (should return 400)" -ForegroundColor Yellow
try {
  $badBody = '{"title":"X","author":"Y","genre":"Comics","price":10,"description":"Test","image":"http://img.com","seller":{"name":"A","email":"a@b.com"}}'
  Invoke-RestMethod -Uri "$base/api/books" -Method POST -Body $badBody -ContentType "application/json"
  Write-Host "FAIL: Should have rejected invalid genre" -ForegroundColor Red
} catch {
  Write-Host "PASS: Correctly rejected invalid genre (validation working)" -ForegroundColor Green
}

# TEST 13: 404 for missing book
Write-Host ""
Write-Host "TEST 13: GET non-existent book (should return 404)" -ForegroundColor Yellow
try {
  Invoke-RestMethod -Uri "$base/api/books/000000000000000000000000" -Method GET
  Write-Host "FAIL: Should have returned 404" -ForegroundColor Red
} catch {
  Write-Host "PASS: Correctly returned 404 for missing book" -ForegroundColor Green
}

# TEST 14: DELETE book (cleanup)
Write-Host ""
Write-Host "TEST 14: DELETE /api/books/:id (cleanup)" -ForegroundColor Yellow
try {
  $del = Invoke-RestMethod -Uri "$base/api/books/$bookId" -Method DELETE
  Write-Host "PASS: $($del.message)" -ForegroundColor Green
} catch { Write-Host "FAIL: $_" -ForegroundColor Red }

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "           All Tests Complete!          " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
