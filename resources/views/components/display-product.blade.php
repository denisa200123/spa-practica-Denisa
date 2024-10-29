<td>{{ $product->title }}</td>
<td>{{ $product->price }}</td>
<td>{{ $product->description }}</td>
<td><img src="{{ asset('images/' . $product->image_path) }}" alt="{{ $product->title }}" /></td>
